const express = require("express");
const { handleCourses } = require("../controllers/courses");
const router = express.Router();

router.get("/", handleCourses);

module.exports = router;
