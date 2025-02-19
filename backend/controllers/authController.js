const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendOTP = require('../config/email');

const otpStore = new Map(); 


exports.signup = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
      
        const [existingUser] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Email already registered" });
        }

     
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 });

       
        await sendOTP(email, otp);

        return res.json({ message: "OTP sent to email. Verify OTP to complete signup." });
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.verifyOtpAndSignup = async (req, res) => {
    const { name, email, password, otp } = req.body;

    if (!otp || !email || !password || !name) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
  
        const storedOtpData = otpStore.get(email);
        if (!storedOtpData) {
            return res.status(400).json({ message: "OTP expired or not found" });
        }

       
        if (Date.now() > storedOtpData.expiresAt) {
            otpStore.delete(email);
            return res.status(400).json({ message: "OTP expired! Request a new one." });
        }

      
        if (storedOtpData.otp !== otp) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

       
        otpStore.delete(email);

        const hashedPassword = await bcrypt.hash(password, 10);

      
        await db.execute(
            "INSERT INTO users (name, email, password, isVerified) VALUES (?, ?, ?, ?)", 
            [name, email, hashedPassword, true]
        );

        
        const [newUser] = await db.execute("SELECT id FROM users WHERE email = ?", [email]);

      
        const token = jwt.sign({ userId: newUser[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

       
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'strict',
            maxAge: 3600000, 
        });

        return res.json({ message: "Signup successful!" });
    } catch (error) {
        console.error("OTP Verification Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
       
        const [users] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ message: "User not found!" });
        }

        const user = users[0];

        if (!user.isVerified) {
            return res.status(401).json({ message: "Verify your account first!" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 3600000, 
        });

        return res.json({ message: "Login successful!" });
    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};


exports.logout = (req, res) => {
    res.cookie('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: new Date(0) 
    });

    return res.json({ message: "Logout successful!" });
};
