const User = require("../models/user");
const Book = require("../models/books");

// book
const handleAddBookToFavourite = async (req, res) => {
  try {
    const { id, bookid } = req.headers;
    const user = await User.findById(id);
    const isBookExist = user.favouriteBooks.includes(bookid);
    if (isBookExist) {
      return res
        .status(200)
        .json({ message: "Book is already exist in favourites!!" });
    }
    await User.findByIdAndUpdate(id, { $push: { favouriteBooks: bookid } });
    return res
      .status(200)
      .json({ message: "Book added successfully to the favourites!!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

const handleDeleteBookToFavourite = async (req, res) => {
  try {
    const { id, bookid } = req.headers;
    const user = await User.findById(id);
    const isBookExist = user.favouriteBooks.includes(bookid);
    if (isBookExist) {
      await User.findByIdAndUpdate(id, { $pull: { favouriteBooks: bookid } });
    }
    return res.status(200).json({ message: "Book removed from favourite!!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

const handleDeleteCourseFromFavourite = async (req, res) => {
  try {
    const { id, courseid } = req.headers;
    const user = await User.findById(id);
    const isCourseExist = user.favourites.includes(courseid);
    if (isCourseExist) {
      await User.findByIdAndUpdate(id, { $pull: { favourites: courseid } });
    }
    return res.status(200).json({ message: "Course removed from favourite!!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

const handleGetFavouriteBooks = async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id).populate("favouriteBooks");
    const favouriteBooks = user.favouriteBooks;
    return res.status(200).json({ data: favouriteBooks });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};
const handleGetFavouriteCourse = async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id).populate("favourites");
    const favouriteCourse = user.favourites;
    return res.status(200).json({ data: favouriteCourse });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

// course
const handleAddCourseToFavourite = async (req, res) => {
  try {
    const { id, courseid } = req.headers;
    const user = await User.findById(id);
    const isCourseExist = user.favourites.includes(courseid);
    if (isCourseExist) {
      return res
        .status(200)
        .json({ message: "Course is already exist in favourites!!" });
    }
    await User.findByIdAndUpdate(id, { $push: { favourites: courseid } });
    return res
      .status(200)
      .json({ message: "Course added successfully to the favourites!!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

module.exports = {
  handleAddBookToFavourite,
  handleDeleteBookToFavourite,
  handleGetFavouriteBooks,
  handleAddCourseToFavourite,
  handleDeleteCourseFromFavourite,
  handleGetFavouriteCourse,
};
