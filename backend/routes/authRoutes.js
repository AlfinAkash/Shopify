const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../utils/authMiddleware"); 


router.post("/signup", authController.signup);
router.post("/login",  authController.login);
router.post("/verify-otp", authController.verifyOtpAndSignup); 
router.post("/logout",authMiddleware, authController.logout);



module.exports = router;
