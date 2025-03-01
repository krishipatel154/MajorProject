const express = require("express");
const {
  handleUserLogin,
  handleUserSignup,
  verifyOTP,
  handleGetUserInfo,
  handleUpdatePassword,
  requestPasswordReset,
  resetPassword,
  handleMyCourse,
} = require("../controllers/user");
const {
  LoginValidation,
  signUpValidation,
} = require("../middlewares/validation");
const { handleAuthentication } = require("../middlewares/auth");
const router = express.Router();

router.post("/login", LoginValidation, handleUserLogin);
router.post("/signup", signUpValidation, handleUserSignup);
router.post("/verify-otp", verifyOTP);
router.get("/user-info", handleAuthentication, handleGetUserInfo);
router.post("/my-course", handleMyCourse);
router.post("/forgot-password", requestPasswordReset);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
