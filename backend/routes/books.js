const express = require("express");
const {
  handleGetBooks,
  handleAddBook,
  handleGetRecentBooks,
  handleDeleteBook,
  handleUpdateBook,
  handleGetBookById,
} = require("../controllers/books");
const { handleAuthentication } = require("../middlewares/auth");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./materials");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post(
  "/add-book",
  upload.single("file"),
  handleAuthentication,
  handleAddBook
);
router.get("/", handleGetBooks);
router.get("/recent-books", handleGetRecentBooks);

router.delete("/delete-book", handleAuthentication, handleDeleteBook);
router.put("/update-book", handleAuthentication, handleUpdateBook);
router.get("/get-book/:id", handleGetBookById);

module.exports = router;
