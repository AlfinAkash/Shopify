import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api/api";

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await logout(); // Call logout API
                localStorage.removeItem("token"); // Remove JWT token
                navigate("/login"); // Redirect to login page
            } catch (error) {
                console.error("Logout Error:", error);
            }
        };

        handleLogout();
    }, [navigate]);

    return (
        <div className="auth-container">
            <h2>Logging out...</h2>
            <p>Please wait while we securely log you out.</p>
        </div>
    );
};

export default Logout;
