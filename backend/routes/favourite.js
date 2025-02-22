const express = require("express");
const { handleAuthentication } = require("../middlewares/auth");
const {
  handleAddBookToFavourite,
  handleDeleteBookToFavourite,
  handleGetFavouriteBooks,
  handleAddCourseToFavourite,
  handleDeleteCourseFromFavourite,
  handleGetFavouriteCourse,
} = require("../controllers/favourite");
const router = express.Router();

// book
router.put(
  "/add-book-to-favourites",
  handleAuthentication,
  handleAddBookToFavourite
);
router.put(
  "/delete-book-from-favourites",
  handleAuthentication,
  handleDeleteBookToFavourite
);
router.get("/get-book", handleAuthentication, handleGetFavouriteBooks);

// course
router.put(
  "/add-course-to-favourites",
  handleAuthentication,
  handleAddCourseToFavourite
);
router.put(
  "/delete-course-from-favourites",
  handleAuthentication,
  handleDeleteCourseFromFavourite
);
router.get("/get-course", handleAuthentication, handleGetFavouriteCourse);

module.exports = router;
