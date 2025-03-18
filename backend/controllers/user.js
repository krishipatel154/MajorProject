const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const userModel = require("../models/user");
const User = require("../models/user");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const handleUserLogin = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await userModel.findOne({ Email });

    if (!user) {
      return res
        .status(403)
        .json({ message: "Invalid Email or Password!!", success: false });
    }

    const isPasswordEqual = await bcrypt.compare(Password, user.Password);
    if (!isPasswordEqual) {
      return res
        .status(403)
        .json({ message: "Invalid Email or Password!!", success: false });
    }

    const otp = generateOTP();
    user.otp = otp;
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.Email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Failed to send OTP!!", success: false });
      }
      res
        .status(200)
        .json({ message: "OTP sent to your email!", success: true, Email });
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error!!", success: false });
  }
};

const verifyOTP = async (req, res) => {
  const { Email, otp } = req.body;
  try {
    const user = await userModel.findOne({ Email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found!", success: false });
    }

    if (user.otp === otp) {
      const jwtToken = jwt.sign(
        { Email: user.Email, Id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      const { FirstName, role, _id } = user;
      return res.status(200).json({
        message: "OTP verified successfully, Login Successful!",
        success: true,
        jwtToken,
        FirstName,
        role,
        id: _id,
      });
    } else {
      return res.status(400).json({ message: "Invalid OTP", success: false });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

const handleUserSignup = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Password } = req.body;
    const user = await userModel.findOne({ Email });

    if (user) {
      return res
        .status(409)
        .json({ message: "User already exists!!", success: false });
    }

    const UserModel = new userModel({ FirstName, LastName, Email, Password });
    UserModel.Password = await bcrypt.hash(Password, 10);
    await UserModel.save();

    res.status(201).json({ message: "Signup Successfully!!", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error!!", success: false });
  }
};

const handleGetUserInfo = async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await userModel.findById(id).select("-password");
    if (!data) {
      return res.status(400).json({ message: "User Not Found!!" });
    }
    return res.status(201).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error!!" });
  }
};

const requestPasswordReset = async (req, res) => {
  try {
    const { Email } = req.body;
    const user = await userModel.findOne({ Email });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.Email,
      subject: "Password Reset",
      text: `You requested a password reset. Click the following link to reset your password: \n\n
      www.http://localhost:5173/reset-password/${token}\n\n
      If you did not request this, please ignore this email.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: "Failed to send reset email!" });
      }
      res.status(200).json({
        success: true,
        message: "Password reset link sent to your email!",
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token!" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.Password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: "Password reset successfully!" });
  } catch (error) {
    res.status(500).json({ success: true, message: "Internal Server Error!" });
  }
};

const handleMyCourse = async (req, res) => {
  const { id, cartItems } = req.body;

  try {
    const user = await User.findById(id);
    if (!user.myCourse) {
      user.myCourse = [];
    }

    user.myCourse = [...user.myCourse, ...cartItems];
    await user.save();

    res
      .status(200)
      .json({ message: "Payment successful, courses added to your profile!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing payment or updating courses." });
  }
};

module.exports = {
  handleUserLogin,
  handleUserSignup,
  verifyOTP,
  handleGetUserInfo,
  resetPassword,
  requestPasswordReset,
  handleMyCourse,
};
