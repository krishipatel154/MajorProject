const express = require("express");
const {
  handleCourses,
  handleGetRecentCourse,
  handleGetCourseById,
} = require("../controllers/courses");
const router = express.Router();

router.get("/", handleCourses);
router.get("/recent-course", handleGetRecentCourse);
router.get("/get-course/:id", handleGetCourseById);

module.exports = router;
