const express = require("express");
const {
  handleCourses,
  handleGetRecentCourse,
  handleGetCourseById,
  handleAddCourse,
  handleDeleteCourse,
} = require("../controllers/courses");
const { handleAuthentication } = require("../middlewares/auth");
const router = express.Router();

router.get("/", handleCourses);
router.get("/recent-course", handleGetRecentCourse);
router.get("/get-course/:id", handleGetCourseById);
router.post("/add-course", handleAuthentication, handleAddCourse);
router.delete("/delete-course", handleAuthentication, handleDeleteCourse);
// router.post("/update-book", handleAuthentication, handleUpdateBook);

module.exports = router;
