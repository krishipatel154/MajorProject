const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/major-project")
  .then(() => console.log("MongoDB connected successfully!!"))
  .catch((e) => console.log("MongoDB connection error: ", e));
