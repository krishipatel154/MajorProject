const express = require("express");
const { handleAuthentication } = require("../middlewares/auth");
const {
  handleAddBookToCart,
  handleDeleteBookFromCart,
  handleGetBooksOfCart,
  handleAddCourseToCart,
  handleGetCourseFromCart,
  handleRemoveCourseFromCart,
} = require("../controllers/cart");
const router = express.Router();

router.put("/add-to-cart", handleAuthentication, handleAddBookToCart);
router.put("/add-course-to-cart", handleAuthentication, handleAddCourseToCart);

router.put(
  "/delete-from-cart/:bookid",
  handleAuthentication,
  handleDeleteBookFromCart
);
router.put(
  "/remove-from-cart/:courseid",
  handleAuthentication,
  handleRemoveCourseFromCart
);
router.get("/get-books", handleAuthentication, handleGetBooksOfCart);
router.get("/get-course", handleAuthentication, handleGetCourseFromCart);

module.exports = router;
