const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    // Get token from cookies
    let token = req.cookies?.token;

    if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid or Expired Token" });
    }
};
