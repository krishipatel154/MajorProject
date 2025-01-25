const { required } = require("joi");
const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Faculty: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Catagory: {
    type: String,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
});

const Course = mongoose.model("course", courseSchema);

module.exports = Course;
