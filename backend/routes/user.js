const express = require("express");
const {
  handleUserLogin,
  handleUserSignup,
  verifyOTP,
} = require("../controllers/user");
const {
  LoginValidation,
  signUpValidation,
} = require("../middlewares/validation");
const router = express.Router();

router.post("/login", LoginValidation, handleUserLogin);
router.post("/signup", signUpValidation, handleUserSignup);
router.post("/verify-otp", verifyOTP);

module.exports = router;
