import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../features/user/userActions";
import "./ResetPassword.scss";

const ResetPassword = () => {
    const { resetToken } = useParams();
    const dispatch = useDispatch();
    const [newPassword, setNewPassword] = useState("");
    const [resetSuccess, setResetSuccess] = useState(false);

    const navigate = useNavigate();

    const handleResetPassword = async () => {
        try {
            await dispatch(resetPassword({ resetToken, newPassword }));
            setResetSuccess(true);
        } catch (error) {
            console.error("Password reset failed:", error.message);
        }
    };

    useEffect(() => {
        if (resetSuccess) {
            // Redirect to the login page after a short delay (e.g., 3 seconds)
            const timer = setTimeout(() => {
                navigate("/login");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [resetSuccess, navigate]);

    return (
        <div className="reset-password">
            {!resetSuccess ? (
                <>
                    <h2 className="reset-password__title">Reset Password</h2>
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="reset-password__input"
                    />
                    <button
                        onClick={handleResetPassword}
                        className="reset-password__button"
                    >
                        Reset Password
                    </button>
                </>
            ) : (
                <div className="reset-password__success">
                    <p className="reset-password__success-text">
                        Password reset successful.
                    </p>
                    <p className="reset-password__redirect-text">
                        Redirecting to login...
                    </p>
                    <div className="reset-password__spinner">
                        {/* Custom circular spinner animation */}
                        <svg
                            className="reset-password__spinner-icon"
                            fill="none"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                className="reset-password__spinner-circle-opacity"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="reset-password__spinner-path-opacity"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-1.647z"
                            ></path>
                        </svg>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ResetPassword;
