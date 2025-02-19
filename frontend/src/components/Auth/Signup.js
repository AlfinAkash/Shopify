import React, { useState } from 'react';
import { signup, verifyOTP } from '../../api/api';
import { useNavigate } from 'react-router-dom'; 
import '../../styles/Auth.css';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [verified, setVerified] = useState(false);
    const [message, setMessage] = useState('');
    const [signupSuccess, setSignupSuccess] = useState(false); 

    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            await signup(formData);
            setOtpSent(true);
            setMessage('OTP sent to your email. Enter OTP to verify.');
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to send OTP.');
        }
    };

    const handleVerifyOTP = async () => {
        if (!otp.trim()) {
            setMessage('Please enter OTP.');
            return;
        }

        try {
            await verifyOTP({ email: formData.email, otp, name: formData.name, password: formData.password });
            setVerified(true);
            setSignupSuccess(true); 
            setTimeout(() => {
                navigate('/login'); 
            }, 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Invalid OTP.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Signup</h2>
            
            {signupSuccess ? (
                <div className="success-message">
                    <h3>🎉 Signup Successful!</h3>
                    <p>You can now log in to your account.</p>
                    <button onClick={() => navigate('/login')}>Go to Login</button> 
                </div>
            ) : (
                <>
                    {message && <p className="message">{message}</p>} 

                    <form onSubmit={handleSignup} className="auth-form">
                        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                        <button type="submit" disabled={otpSent}>Sign Up & Get OTP</button>
                    </form>

                    {otpSent && (
                        <div className="otp-section">
                            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                            <button onClick={handleVerifyOTP} disabled={verified}>Verify OTP</button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Signup;
