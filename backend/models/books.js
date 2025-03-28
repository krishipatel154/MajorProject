const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Author: {
      type: String,
      required: true,
    },
    Pdf: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subCategory: {
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

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
