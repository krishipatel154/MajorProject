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
const handleAddBook = async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access!!" });
    }

    const { Name, Author, desc, language, Category, Image, Logo } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "File not uploaded" });
    }

    const bookData = {
      Name,
      Author,
      desc,
      language,
      Category,
      Image,
      Pdf: req.file.filename,
      Logo,
    };

    const newBook = await Book.create(bookData);

    res.status(201).json({
      message: "Book added successfully",
      book: newBook,
    });
  } catch (error) {
    console.error("Error adding book:", error);
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
    const query = await Book.findByIdAndUpdate(bookid, {
      Name: req.body.Name,
      Author: req.body.Author,
      Category: req.body.Category,
      Price: req.body.Price,
      Image: req.body.Image,
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
    const { id, bookid } = req.headers;
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
