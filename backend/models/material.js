const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    Name: String,
    Pdf: String,
  },
  { timestamps: true }
);

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
