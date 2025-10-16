import User from "../models/User.js";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken"
import crypto from "crypto";
import Otp from "../models/Otp.js";
import { createAndSendOtp, verifyOtp } from "../services/otpService.js";
import { Op } from "sequelize";


const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    await Promise.all([
      body("name").trim().notEmpty().withMessage("Name is required").run(req),
      body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid Email").run(req),
      body("password").trim().notEmpty().withMessage("Password is required").isLength({ min: 8 }).withMessage("Password must be 8 characters").run(req),
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
      body("password").trim().notEmpty().withMessage("Password is required").run(req)
    ])
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return res.status(400).json({ success: false, message: "User does not exist" })
    }
    
    if (!user.verified) {
      const { success, message } = await createAndSendOtp(email);
      if (!success) {
        return res.status(400).json({ success: false, message });
      }
      
      return res.status(401).json({
        success: false,
        accountType: "staff",
        message: "Please verify your email. A new OTP has been sent."
      });
    }
   

    const ismatch = await bcrypt.compare(password, user.password)
   
    if (ismatch) {
      const token = jwt.sign({ id: user.user_id, role: user.role }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
      res.json({
        success: true,
        message: "Login successfully",
        token
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid password' })
    }

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ success: false, message: "Something went wrong. Please try again later." });
  }

};


const addUserByAdmin = async (req, res) => {
  try {
    const { name, email, password, phone, address, role } = req.body;
    await Promise.all([
      body("name").trim().notEmpty().withMessage("Name is required").run(req),
      body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid Email").run(req),
      body("password").trim().notEmpty().withMessage("Password is required").isLength({ min: 8 }).withMessage("Password must be 8 characters").run(req),
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

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.user.role === "admin" && Number(req.user.id) === Number(id)) {
      return res.json({ success: false, message: "Admins cannot delete their own account" });
    }

    const user = await User.findByPk(id);
    if (!user) {
      return res.json({ success: false, message: "User not found" })
    }
    await user.destroy();
    return res.json({ success: true, message: "Account Deleted Successfully" })
  } catch (error) {
    console.error("Error while registering user:", error);
    res.status(500).json({ error: "Failed to delete account" });
  }
}

const initiateCustomerLogin = async (req, res) => {
  try {
    const { email } = req.body
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already exist. Please login your account" })
    }

    const { success, message } = await createAndSendOtp(email)
    if (!success) {
      return res.status(400).json({ success: false, message: message })
    }

    res.json({ success: true, accountType: "customer", message: message })
  } catch (error) {
    console.log(error)
    return res.json({ success: false, message: "Something went wrong. Please try agian later" })
  }
}

const verifyOtpAndLogin = async (req, res) => {
  try {
    const { email, password, otp, accountType } = req.body
    await Promise.all([
      body("email").isEmail().normalizeEmail().run(req),
      body("otp").isLength({ min: 4, max: 6 }).isNumeric().run(req),
      body("accountType").isIn(['customer', 'staff']).run(req)
    ]);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { success, message } = await verifyOtp(email, otp)
    if (!success) {
      return res.status(400).json({ success: false, message: message })
    }

    if (accountType === 'staff') {
      const staffUser = await User.findOne({
        where: {
          email, role: {
            [Op.in]: ['cashier', 'waiter', 'kitchen', 'admin']
          }
        }
      });

      if (!staffUser) {
        return res.status(404).json({
          success: false,
          message: "Staff account not found. Please contact administrator."
        });
      }

      const [affectedRows] = await User.update(
        { verified: true },
        {
          where: {
            email,
            role: {
              [Op.in]: ['cashier', 'waiter', 'kitchen', 'admin']
            }
          }
        }
      );

      if (affectedRows === 0) {
        return res.status(400).json({
          success: false,
          message: "Unable to verify account."
        });
      }

      await Otp.destroy({ where: { email } });

      return res.json({
        success: true,
        message: "Account verified successfully."
      });
    } else if (accountType === 'customer') {

      const existingUser = await User.findOne({ where: { email } })
      if (existingUser) {
        if (existingUser.role === "customer") {
          return res.status(400).json({ success: false, message: "Account is already verified. Please log in with your email and password." })
        } else if (['cashier', 'waiter', 'kitchen', 'admin'].includes(existingUser.role)) {
          return res.status(400).json({
            success: false,
            message: "This email is registered as staff. Please use your staff credentials to log in."
          });
        }
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.create({ email, role: "customer", password: hashedPassword, verified: true })
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      await Otp.destroy({ where: { email } });

      res.json({ success: true, message: "Account verified Successfully.", token: token });
    }

  } catch (error) {
    console.log(error)
    return res.json({ success: false, message: "Something went wrong. Please try agian later" })
  }
}

const getAllStaffAccounts = async (req , res)=>{
  try {
    const users = await User.findAll({
      where: {
        role: {
          [Op.in]: ["cashier", "kitchen", "waiter"]
        }
      },
      attributes: { exclude: ["password"] } 
    });

    return res.json({ success: true, data: users });
  } catch (error) {
    console.log(error)
    return res.json({ success: false, message: "Something went wrong. Please try agian later" })
  }
}




export { registerUser, userLogin, addUserByAdmin, deleteAccount, initiateCustomerLogin, verifyOtpAndLogin , getAllStaffAccounts };
