const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const handleUserLogin = (req, res) => {
  res.send("Login");
};

const handleUserSignup = async (req, res) => {
  try {
    const { FirstName, LastName, Email, Password } = req.body;
    const user = await userModel.findOne({ Email });
    if (user) {
      return res
        .status(409)
        .json({ message: "User already exist!!", success: false });
    }
    const UserModel = new userModel({ FirstName, LastName, Email, Password });
    UserModel.Password = await bcrypt.hash(Password, 10);
    await UserModel.save();
    res.status(201).json({ messange: "Signup Successfully!!", success: true });
  } catch (error) {
    res
      .status(500)
      .json({ messange: "Internal Server Error!!", success: false });
  }
};

module.exports = {
  handleUserLogin,
  handleUserSignup,
};
