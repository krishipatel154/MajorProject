const jwt = require("jsonwebtoken");

// const handleAuthentication = async (req, res, next) => {
//   const token = req.headers["authorization"];
//   if (!auth) {
//     return res.status(403).json({ message: "Login is requiired!!" });
//   }
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) return res.status(403).json({ message: "Invalid token" });
//       req.user = user;
//       next();
//     });
//     // req.user = decoded;
//     // next();
//   } catch (err) {
//     return res.status(401).json({ message: "JWT token is wrong or expired!!" });
//   }
// };

const handleAuthentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res
      .status(401)
      .json({ message: "Authentication token is required!!" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token expired!!" });
    }
    req.user = user;
    next();
  });
};

module.exports = {
  handleAuthentication,
};
