const express = require("express");

const { handleAuthentication } = require("../middlewares/auth");
const { handleSearchItem } = require("../controllers/search");
const router = express.Router();

router.get("/search-item", handleSearchItem);

module.exports = router;
