const express = require("express");
const {
  handleCourses,
  handleGetRecentCourse,
  handleGetCourseById,
  handleAddCourse,
  handleDeleteCourse,
  handleUpdateCourse,
  handleGetMyCourse,
  handleToggleLive,
} = require("../controllers/courses");
const { handleAuthentication } = require("../middlewares/auth");
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");
const router = express.Router();

router.get("/", handleCourses);
router.get("/recent-course", handleGetRecentCourse);
router.get("/get-course/:id", handleGetCourseById);
router.post("/add-course", handleAuthentication, handleAddCourse);
router.delete("/delete-course", handleAuthentication, handleDeleteCourse);
router.put("/update-course", handleAuthentication, handleUpdateCourse);
router.get("/get-my-course", handleGetMyCourse);
router.put("/toggle-live/:id", handleAuthentication, handleToggleLive);

router.get("/get-stream-token", handleAuthentication, async (req, res) => {
  try {
    const { channelName } = req.query;

    if (!channelName) {
      return res.status(400).json({ message: "Channel name is required" });
    }

    const appID = process.env.AGORA_APP_ID;
    const appCertificate = process.env.AGORA_APP_CERTIFICATE;

    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const token = RtcTokenBuilder.buildTokenWithUid(
      appID,
      appCertificate,
      channelName,
      0,
      RtcRole.PUBLISHER,
      privilegeExpiredTs
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Error generating token" });
  }
});

module.exports = router;
