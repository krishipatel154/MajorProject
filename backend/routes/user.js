const express = require("express");
const { handleUserLogin, handleUserSignup } = require("../controllers/user");
const {
  LoginValidation,
  signUpValidation,
} = require("../middlewares/validation");
const router = express.Router();

router.post("/login", LoginValidation, handleUserLogin);
router.post("/signup", signUpValidation, handleUserSignup);

module.exports = router;
