const passport = require("passport");
const session = require("express-session");
const passportConfig = require("./config/passportConfig");
const userRoute = require("./routes/user");
const courseRoute = require("./routes/courses");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("./models/db");
require("dotenv").config();

const PORT = process.env.PORT || 8089;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passportConfig(passport);

// routes
app.use("/user", userRoute);
app.use("/course", courseRoute);

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
app.use("/users", require("./routes/user"));
