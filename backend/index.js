const userRoute = require("./routes/user");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("./models/db");
require("dotenv").config();

const PORT = process.env.PORT || 8001;

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// routes
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
