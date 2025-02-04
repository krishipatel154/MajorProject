const express = require("express");
const {
  handleGetBooks,
  handleAddBook,
  handleGetRecentBooks,
  handleDeleteBook,
  handleUpdateBook,
} = require("../controllers/books");
const { handleAuthentication } = require("../middlewares/auth");
const router = express.Router();

router.get("/", handleGetBooks);
router.get("/recent-books", handleGetRecentBooks);
router.post("/add-book", handleAuthentication, handleAddBook);
router.post("/delete-book", handleAuthentication, handleDeleteBook);
router.post("/update-book", handleAuthentication, handleUpdateBook);

module.exports = router;
