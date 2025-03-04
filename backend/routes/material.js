const express = require("express")

const router = express.Router();
const multer = require("multer");
const {handleAddMaterial, handleGetMaterial} = require("../controllers/material")
const { handleAuthentication } = require("../middlewares/auth");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./files");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post(
  "/add-material",
  upload.single("file"),
  handleAuthentication,
  handleAddMaterial
);
router.get("/get-material", handleGetMaterial)

module.exports = router;