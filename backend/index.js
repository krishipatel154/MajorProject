const passport = require("passport");
const session = require("express-session");
const passportConfig = require("./config/passportConfig");
const userRoute = require("./routes/user");
const courseRoute = require("./routes/courses");
const bookRoute = require("./routes/books");
const materialRoute = require("./routes/material");
const favouriteRoute = require("./routes/favourite");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const searchRoute = require("./routes/search");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const path = require("path");
require("./models/db");
require("dotenv").config();
const PORT = process.env.PORT || 8089;

// middlewares
app.use(
  "/files",
  (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
  },
  express.static("files")
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
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
app.use("/books", bookRoute);
app.use("/material", materialRoute);
app.use("/favourite", favouriteRoute);
app.use("/cart", cartRoute);
app.use("/order", orderRoute);
app.use("/search", searchRoute);

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
app.use("/users", require("./routes/user"));
