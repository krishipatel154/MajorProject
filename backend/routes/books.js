const express = require("express");
const { handleGetBooks } = require("../controllers/books");
const router = express.Router();

router.get("/", handleGetBooks);

module.exports = router;
