const Course = require("../models/courses");

const handleCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    console.log("Course Error: ", error);
    res.status(500).json({ success: false });
  }
};

const handleGetCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Course.findById(id);
    res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

const handleGetRecentCourse = async (req, res) => {
  try {
    const course = await Course.find({}).sort({ crestedAt: -1 }).limit(4);
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

module.exports = {
  handleCourses,
  handleGetCourseById,
  handleGetRecentCourse,
};
