const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const userModel = require("../models/user");

const passportConfig = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "Email" },
      async (Email, Password, done) => {
        try {
          const user = await userModel.findOne({ Email });

          if (!user) {
            return done(null, false, { message: "Invalid Email or Password" });
          }

          const isPasswordEqual = await bcrypt.compare(Password, user.Password);

          if (!isPasswordEqual) {
            return done(null, false, { message: "Invalid Email or Password" });
          }

          // Pass user details to OTP stage after initial authentication
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

module.exports = passportConfig;
