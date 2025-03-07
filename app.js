const express = require("express");
const app = express();
const agoraRoutes = require("./routes/agoraRoutes");

// ... other middleware and configurations ...

app.use("/api/agora", agoraRoutes);
