const Book = require("../models/books");
const User = require("../models/user");
const Material = require("../models/material");

const handleAddMaterial = async (req, res) => {
  try {
    const { id } = req.headers;

    const user = await User.findById(id);
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Unauthorized access!!" });
    }

    const { Name } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File not uploaded" });
    }
    const materialData = {
      Name,
      Pdf: req.file.filename,
    };

    const newMaterial = await Material.create(materialData);

    res.status(201).json({
      message: "Material added successfully",
      material: newMaterial,
    });
  } catch (error) {
    console.error("Error adding material:", error);
    return res.status(500).json({ message: "Internal server error!!" });
  }
};

const handleGetMaterial = async (req, res) => {
  try {
    await Material.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.json({ message: "Internal Server Error!!" });
  }
};

module.exports = {
  handleAddMaterial,
  handleGetMaterial,
};
