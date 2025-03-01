const express = require("express");
const {
  handleCourses,
  handleGetRecentCourse,
  handleGetCourseById,
  handleAddCourse,
  handleDeleteCourse,
  handleUpdateCourse,
  handleGetMyCourse,
} = require("../controllers/courses");
const { handleAuthentication } = require("../middlewares/auth");
const router = express.Router();

router.get("/", handleCourses);
router.get("/recent-course", handleGetRecentCourse);
router.get("/get-course/:id", handleGetCourseById);
router.post("/add-course", handleAuthentication, handleAddCourse);
router.delete("/delete-course", handleAuthentication, handleDeleteCourse);
router.put("/update-course", handleAuthentication, handleUpdateCourse);
router.get("/get-my-course", handleGetMyCourse);

module.exports = router;
