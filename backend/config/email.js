const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOTP = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Your OTP for Signup Verification",
        text: `Your OTP is: ${otp}`, 
        html: `
       <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Shopify App - Email Verification</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #121212; padding: 20px; margin: 0; color: #ffffff;">
    <div style="max-width: 600px; margin: 0 auto; background: #1e1e1e; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);">

        <!-- Header -->
        <div style="text-align: center; padding: 20px; background: #000000; border-radius: 8px 8px 0 0;">
            <h2 style="color: #ffffff; margin: 0;">Shopify App</h2>
        </div>

        <!-- Body -->
        <div style="padding: 30px; text-align: left;">
            <p style="margin-bottom: 15px;">Dear User,</p>
            <p style="margin-bottom: 15px;">
                To verify your email for our Shopify App, please use the OTP below:
            </p>
            <p style="text-align: center; font-size: 24px; font-weight: bold; color: #ffffff; background: #0073e6; padding: 12px 20px; border-radius: 6px; display: inline-block;">
                ${otp}
            </p>
            <p style="margin-top: 15px;">
                If you did not request this, please ignore this email.
            </p>
            <p style="font-weight: bold; margin-top: 20px;">Best regards,</p>
            <p style="font-weight: bold;">Akash A</p>
        </div>

        <!-- Footer -->
        <div style="background: #1e1e1e; padding: 20px; text-align: center; border-top: 1px solid #333;">
            <p style="font-size: 12px; color: #cccccc; margin-bottom: 10px;">Follow me on:</p>
            <p style="margin: 0;">
                <a href="https://www.instagram.com/a.alfinakash" style="color: #0073e6; text-decoration: none; font-weight: bold;">Instagram</a> |
                <a href="https://www.twitter.com/AlfinAkash" style="color: #0073e6; text-decoration: none; font-weight: bold;">Twitter</a> |
                <a href="https://www.linkedin.com/in/AlfinAkash" style="color: #0073e6; text-decoration: none; font-weight: bold;">LinkedIn</a> |
                <a href="https://github.com/AlfinAkash" style="color: #0073e6; text-decoration: none; font-weight: bold;">GitHub</a> |
                <a href="https://alfinakash.vercel.app/" style="color: #0073e6; text-decoration: none; font-weight: bold;">Website</a>
            </p>
            <p style="font-size: 12px; color: #cccccc; margin-top: 10px;">© 2024 Shopify App. All Rights Reserved.</p>
        </div>

    </div>
</body>
</html>
`
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendOTP;
