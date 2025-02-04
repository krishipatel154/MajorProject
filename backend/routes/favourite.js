const express = require("express");
const { handleAuthentication } = require("../middlewares/auth");
const {
  handleAddBookToFavourite,
  handleDeleteBookToFavourite,
  handleGetFavouriteBooks,
} = require("../controllers/favourite");
const router = express.Router();

router.put(
  "/add-to-favourites",
  handleAuthentication,
  handleAddBookToFavourite
);
router.put(
  "/delete-from-favourites",
  handleAuthentication,
  handleDeleteBookToFavourite
);
router.get("/get-book", handleAuthentication, handleGetFavouriteBooks);

module.exports = router;
