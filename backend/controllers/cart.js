const User = require("../models/user");
const Book = require("../models/books");

const handleAddBookToCart = async (req, res) => {
  try {
    const { id, bookid } = req.headers;
    const user = await User.findById(id);
    const isBookExist = user.cart.includes(bookid);
    if (isBookExist) {
      return res
        .status(200)
        .json({ message: "Book is already exist in cart!!" });
    }
    await User.findByIdAndUpdate(id, { $push: { cart: bookid } });
    return res
      .status(200)
      .json({ message: "Book added successfully to the cart!!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};
const handleAddCourseToCart = async (req, res) => {
  try {
    const { id, courseid } = req.headers;
    const user = await User.findById(id);
    const isCourseExist = user.cart.includes(courseid);
    if (isCourseExist) {
      return res
        .status(200)
        .json({ message: "Course is already exist in cart!!" });
    }
    await User.findByIdAndUpdate(id, { $push: { cart: courseid } });
    return res
      .status(200)
      .json({ message: "Course added successfully to the cart!!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

const handleDeleteBookFromCart = async (req, res) => {
  try {
    const { bookid } = req.params;
    const { id } = req.headers;
    const user = await User.findById(id);
    const isBookExist = user.cart.includes(bookid);
    if (isBookExist) {
      await User.findByIdAndUpdate(id, { $pull: { cart: bookid } });
    }
    return res.status(200).json({ message: "Book removed from cart!!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};
const handleRemoveCourseFromCart = async (req, res) => {
  try {
    const { courseid } = req.params;
    const { id } = req.headers;
    const user = await User.findById(id);
    const isCourseExist = user.cart.includes(courseid);
    if (isCourseExist) {
      await User.findByIdAndUpdate(id, { $pull: { cart: courseid } });
    }
    return res.status(200).json({ message: "Course removed from cart!!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

const handleGetBooksOfCart = async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id).populate("cart");
    const cartBooks = user.cart.reverse();
    return res.status(200).json({ data: cartBooks });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};
const handleGetCourseFromCart = async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id).populate("cart");
    const cartCourse = user.cart.reverse();
    return res.status(200).json({ data: cartCourse });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

module.exports = {
  handleAddBookToCart,
  handleDeleteBookFromCart,
  handleRemoveCourseFromCart,
  handleGetBooksOfCart,
  handleAddCourseToCart,
  handleGetCourseFromCart,
};
