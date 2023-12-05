import { useState } from "react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { signInUser, forgotPassword } from "../../../features/user/userActions";
import ForgotPasswordForm from "../Password/ForgotPasswordForm";
import "./Login.scss"; // Import the SCSS file

const Login = () => {
    const googleLogin = () => {
        window.open("http://localhost:5000/api/v1/auth/google", "_self");
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const handleFormSubmit = async (email, password, rememberMe) => {
        try {
            await dispatch(signInUser({ email, password, rememberMe }));

            if (rememberMe) {
                localStorage.setItem(
                    "userData",
                    JSON.stringify({ email, rememberMe: true }),
                );
            } else {
                localStorage.removeItem("userData");
            }

            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    const handleForgotPasswordSubmit = async (email) => {
        try {
            await dispatch(forgotPassword({ email }));

            console.log("Password reset successful.");
            setShowForgotPassword(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-card__title">Join Us</h2>
                <h2 className="login-card__subtitle">Share your thoughts</h2>
                <div className="flex flex-col gap-4 mt-4 rounded-md">
                    <button className="login-card__google-btn" onClick={googleLogin}>
                        <AiFillGoogleCircle className="login-card__google-btn__icon" />
                        <p className="login-card__google-btn__text">Sign in with Google</p>
                    </button>

                    <div className="login-card__divider">
                        <div className="login-card__divider__line" />
                        <p className="login-card__divider__text">Or</p>
                        <div className="login-card__divider__line" />
                    </div>

                    {showForgotPassword ? (
                        <ForgotPasswordForm onSubmit={handleForgotPasswordSubmit} />
                    ) : (
                        <LoginForm onSubmit={handleFormSubmit} />
                    )}

                    <Link
                        to="#"
                        className="login-card__link"
                        onClick={() => setShowForgotPassword(!showForgotPassword)}
                    >
                        {showForgotPassword ? "Back to Login" : "Forgot Password?"}
                    </Link>

                    <div className="login-card__signup-link">
                        <div className="login-card__signup-link__text">
                            Don&rsquo;t have an account?
                            <Link to="/signup" className="login-card__signup-link__link">
                                Sign up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
