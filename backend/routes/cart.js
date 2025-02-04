const express = require("express");
const { handleAuthentication } = require("../middlewares/auth");
const {
  handleAddBookToCart,
  handleDeleteBookFromCart,
  handleGetBooksOfCart,
} = require("../controllers/cart");
const router = express.Router();

router.put("/add-to-cart", handleAuthentication, handleAddBookToCart);
router.put(
  "/delete-from-cart/:bookid",
  handleAuthentication,
  handleDeleteBookFromCart
);
router.get("/get-books", handleAuthentication, handleGetBooksOfCart);

module.exports = router;
