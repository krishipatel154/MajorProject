const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const userModel = require("../models/user");
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
        console.log(error);
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

      return res.status(200).json({
        message: "OTP verified successfully, Login Successful!",
        success: true,
        jwtToken,
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

module.exports = {
  handleUserLogin,
  handleUserSignup,
  verifyOTP,
};
