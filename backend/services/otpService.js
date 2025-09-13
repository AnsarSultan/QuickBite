import crypto from "crypto";
import Otp from "../models/Otp.js";
import transporter from "../config/nodemailer.js";

const createAndSendOtp = async (email) => {
  const otp = crypto.randomInt(100000, 999999).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  const otpCreated = await Otp.create({ email, otp, expiresAt });
  if (!otpCreated) {
    return { success: false, message: "Failed to create OTP" };
  }

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
  });

  return {success: true , message: "OTP sent successfully"}
};

const verifyOtp = async (email, otp) => {
  const record = await Otp.findOne({
    where: { email, otp },
    order: [["createdAt", "DESC"]],
  });

  if (!record) {
    return { success: false, message: "Invalid OTP" };
  }
  if (new Date() > record.expiresAt) {
    return { success: false, message: "OTP expired" };
  }
  return {success: true}
};

export { createAndSendOtp, verifyOtp };
