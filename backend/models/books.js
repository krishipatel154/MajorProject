const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  },
  Catagory: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true,
  },
  Image: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("Books", bookSchema);

module.exports = Book;
