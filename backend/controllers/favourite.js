const User = require("../models/user");
const Book = require("../models/books");

const handleAddBookToFavourite = async (req, res) => {
  try {
    const { id, bookid } = req.headers;
    const user = await User.findById(id);
    const isBookExist = user.favourites.includes(bookid);
    if (isBookExist) {
      return res
        .status(200)
        .json({ message: "Book is already exist in favourites!!" });
    }
    await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
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
    const isBookExist = user.favourites.includes(bookid);
    if (isBookExist) {
      await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
    }
    return res.status(200).json({ message: "Book removed from favourite!!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

const handleGetFavouriteBooks = async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id).populate("favourites");
    const favouriteBooks = user.favourites;
    return res.status(200).json({ data: favouriteBooks });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

module.exports = {
  handleAddBookToFavourite,
  handleDeleteBookToFavourite,
  handleGetFavouriteBooks,
};
