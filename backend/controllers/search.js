const Book = require("../models/books");
const Course = require("../models/courses");

const handleSearchItem = async (req, res) => {
  const searchQuery = req.query.q;

  try {
    const [books, courses] = await Promise.all([
      Book.find({ Name: { $regex: searchQuery, $options: "i" } }), // Search in books collection
      Course.find({ Name: { $regex: searchQuery, $options: "i" } }), // Search in courses collection
    ]);

    res.json({
      books,
      courses,
    });
  } catch (error) {
    res.status(500).json({ message: "Error occurred while searching" });
  }
};

module.exports = {
  handleSearchItem,
};
