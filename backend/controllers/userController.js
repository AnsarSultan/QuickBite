import User from "../models/User.js";
import bcrypt from "bcrypt";
import { body , validationResult } from "express-validator";
import jwt from "jsonwebtoken"
import crypto from "crypto";
import Otp from "../models/Otp.js";
import nodemailer from "nodemailer";


const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    await Promise.all([
    body("name").trim().notEmpty().withMessage("Name is required").run(req),
    body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid Email").run(req),
    body("password").trim().notEmpty().withMessage("Password is required").isLength({min: 8}).withMessage("Password must be 8 characters").run(req),
])
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
    });
    if (newUser) {
      res.json({ success: true, message: "User registered successfully" });
    }
  } catch (error) {
    console.error("Error while registering user:", error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

  await Promise.all([
    body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid Email").run(req),
    body("password").trim().notEmpty().withMessage("Password is required").isLength({min: 8}).withMessage("Password must be atleast 8 characters long").run(req)
  ])

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const user = await User.findOne({where: {email}})
  if(!user){
    return res.json({success: false , message: "User does not exist"})
  }
  const ismatch = await bcrypt.compare(password, user.password)
  if(ismatch){
    const token = jwt.sign({id: user.user_id , role: user.role} , process.env.JWT_SECRET , {expiresIn: process.env.JWT_EXPIRES_IN})
    res.json({
      success: true,
      message: "Login successfully",
      token
    });
  }else{
    res.json({success:false, message: 'Invalid password'})
  }
 
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
  }
  
};


const addUserByAdmin  = async (req, res) => {
  try {
    const { name, email, password, phone, address , role} = req.body;
    await Promise.all([
    body("name").trim().notEmpty().withMessage("Name is required").run(req),
    body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid Email").run(req),
    body("password").trim().notEmpty().withMessage("Password is required").isLength({min: 8}).withMessage("Password must be 8 characters").run(req),
    body("role").trim().notEmpty().withMessage("Please select a role").run(req)
])
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role
    });
    if (newUser) {
      res.json({ success: true, message: `${role} account Added successfully` });
    }
  } catch (error) {
    console.error("Error while registering user:", error);
    res.status(500).json({ error: "Failed to create account" });
  }
};

const deleteAccount = async (req , res) =>{
  try {
    const { id } = req.params;
    if (req.user.role === "admin" && Number(req.user.id) === Number(id)) {
      return res.json({ success: false, message: "Admins cannot delete their own account" });
    }

    const user = await User.findByPk(id);
    if(!user){
      return res.json({success: false , message: "User not found"})
    }
    await user.destroy();
    return res.json({success:true , message:"Account Deleted Successfully"})
  } catch (error) {
    console.error("Error while registering user:", error);
    res.status(500).json({ error: "Failed to delete account" });
  }
}

const requestOtp = async (req , res)=>{
  try {
    const { email } = req.body
  const existingUser = await User.findOne({ where: {email}});
  if(existingUser){
    return res.status(400).json({success: false , message: "Email already exist. Please login your account"})
  }

  const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); 


    const otpCreated = await Otp.create({email, otp , expiresAt})
    if(!otpCreated){
      return res.json({success:false , message: "Failed to create"})
    }
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`
    });

    res.json({success:true , message: "OTP sent successfully"})
  } catch (error) {
    console.log(error)
    return res.json({success: false , message: "Something went wrong. Please try agian later"})
  }
}

const verifyOtp = async (req , res)=>{
 try {
  const {email , password , otp} = req.body
  const record = await Otp.findOne({
    where: { email, otp },
    order: [["createdAt", "DESC"]],
  });

  if(!record){
    return res.status(404).json({success:false , message: "Invalid OTP"});
  }
  if(new Date() > record.expiresAt){
    return res.status(400).json({success:false , message: "OTP expired"})
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({ email , role: "customer", password: hashedPassword})
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  await Otp.destroy({ where: { email } });

    res.json({ success: true, token });
 } catch (error) {
  console.log(error)
  return res.json({success: false , message: "Something went wrong. Please try agian later"})
 }
}

export { registerUser, userLogin , addUserByAdmin , deleteAccount , requestOtp , verifyOtp};
