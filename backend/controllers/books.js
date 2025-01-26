const Book = require("../models/books");

const handleGetBooks = async (req, res) => {
  try {
    const book = await Book.find({});
    console.log(book);
    res.status(200).json(book);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleGetBooks,
};
