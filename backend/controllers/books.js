const Book = require("../models/books");
const User = require("../models/user");
const handleGetBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};
const handleGetBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

const handleGetRecentBooks = async (req, res) => {
  try {
    const books = await Book.find({}).sort({ crestedAt: -1 }).limit(4);
    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

// admin side
const handleAddBook = async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(500).json({ message: "Internal server error!!" });
    }
    const book = new Book({
      Name: req.body.name,
      Author: req.body.author,
      Catagory: req.body.catagory,
      Price: req.body.price,
      Image: req.body.image,
      desc: req.body.desc,
      language: req.body.language,
    });
    await book.save();
    return res.status(200).json({ message: "Book added successfully!!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

const handleUpdateBook = async (req, res) => {
  try {
    const { id, bookid } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res
        .status(500)
        .json({ message: "You don't have admin priviliges!!" });
    }
    await Book.findByIdAndUpdate(bookid, {
      Name: req.body.name,
      Author: req.body.author,
      Catagory: req.body.catagory,
      Price: req.body.price,
      Image: req.body.image,
      desc: req.body.desc,
      language: req.body.language,
    });
    return res.status(200).json({ message: "Book updated successfully!!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

const handleDeleteBook = async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res
        .status(500)
        .json({ message: "You don't have admin priviliges!!" });
    }

    await Book.findByIdAndDelete(bookid);
    return res.status(200).json({ message: "Book deleted successfully!!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

module.exports = {
  handleGetBooks,
  handleGetBookById,
  handleGetRecentBooks,
  handleAddBook,
  handleDeleteBook,
  handleUpdateBook,
};
