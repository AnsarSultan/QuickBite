import User from "../models/User.js";
import bcrypt from "bcrypt";
import { body , validationResult } from "express-validator";

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, address } = req.body;
    await Promise.all([
    body("name").trim().notEmpty().withMessage("Name is required").run(req),
    body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid Email").run(req),
    body("password").trim().notEmpty().withMessage("Password is required").isLength({min: 8}).withMessage("Password must be 8 characters").run(req),
    body("role").trim().notEmpty().withMessage("Role is required").run(req)
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

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password_hash: hashedPassword,
      role,
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

  res.json({
    success: true,
    message: `${email} is trying to login using ${password}`,
  });
};
export { registerUser, userLogin };
