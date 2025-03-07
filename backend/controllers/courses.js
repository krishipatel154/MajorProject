const Course = require("../models/courses");
const User = require("../models/user");

const handleCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
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
const handleAddCourse = async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      return res.status(400).json({ message: "User ID not provided!" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access!" });
    }

    const { name, faculty, catagory, price, image, desc, language } = req.body;

    if (
      !name ||
      !faculty ||
      !catagory ||
      !price ||
      !image ||
      !desc ||
      !language
    ) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const course = new Course({
      Name: name, // Ensure that this matches your schema
      Faculty: faculty, // Update this field to match schema (Faculty with uppercase F)
      Category: catagory, // Update this field to match schema (Category with correct spelling)
      Price: price,
      Image: image,
      desc: desc,
      language: language,
    });

    await course.save();
    return res.status(200).json({ message: "Course added successfully!" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({ message: "Internal server error!" });
  }
};

const handleUpdateCourse = async (req, res) => {
  try {
    const { id, courseid } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res
        .status(500)
        .json({ message: "You don't have admin priviliges!!" });
    }

    await Course.findByIdAndUpdate(
      courseid,
      {
        Name: req.body.Name,
        Faculty: req.body.Faculty,
        Catagory: req.body.Catagory,
        Price: req.body.Price,
        Image: req.body.Image,
        desc: req.body.desc,
        Language: req.body.Language,
      },
      { new: true }
    );
    return res.status(200).json({ message: "Course updated successfully!!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

const handleDeleteCourse = async (req, res) => {
  try {
    const { courseid, id } = req.headers;
    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res
        .status(500)
        .json({ message: "You don't have admin priviliges!!" });
    }

    await Course.findByIdAndDelete(courseid);
    return res.status(200).json({ message: "Course deleted successfully!!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

const handleGetMyCourse = async (req, res) => {
  try {
    const { id } = req.headers;
    const user = await User.findById(id).populate("myCourse");
    const myCourse = user.myCourse;
    return res.status(200).json({ myCourse: myCourse });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user's courses." });
  }
};

const handleToggleLive = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    const isLive = !course.isLive;
    const streamStartTime = isLive ? new Date() : null;
    const streamEndTime = !isLive ? new Date() : null;

    await Course.findByIdAndUpdate(
      id,
      {
        isLive,
        streamStartTime,
        streamEndTime,
      },
      { new: true }
    );

    return res.status(200).json({
      message: isLive ? "Live stream started!" : "Live stream ended!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error!" });
  }
};

module.exports = {
  handleCourses,
  handleGetCourseById,
  handleGetRecentCourse,
  handleAddCourse,
  handleDeleteCourse,
  handleUpdateCourse,
  handleGetMyCourse,
  handleToggleLive,
};
