const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
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
    Category: {
      type: String,
      required: true,
    },
    Image: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
