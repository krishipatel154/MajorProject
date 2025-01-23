const Course = require("../models/courses");

const handleCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    console.log(courses);
    res.status(200).json(courses);
  } catch (error) {
    console.log("Course Error: ", error);
    res.status(500).json({ success: false });
  }
};

module.exports = {
  handleCourses,
};
