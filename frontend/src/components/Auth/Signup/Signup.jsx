import { AiFillGoogleCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import "./Signup.scss";

const Signup = () => {
    const navigate = useNavigate();

    const googleLogin = () => {
        window.open("http://localhost:5000/api/v1/auth/google/", "_self");
    };

    const handleContinueWithEmail = () => {
        navigate("/signup/form");
    };

    return (
        <div className="signup">
            <div className="signup__container">
                <div className="signup__card">
                    <h2 className="signup__title">Join Us</h2>
                    <h2 className="signup__subtitle">Share your thoughts</h2>
                    <div className="signup__buttons">
                        <button className="signup__google-button" onClick={googleLogin}>
                            <AiFillGoogleCircle className="signup__google-icon" />
                            <p className="signup__button-text">Sign up with Google</p>
                        </button>

                        <div className="signup__divider">
                            <div className="signup__divider-line" />
                            <p className="signup__divider-text">Or</p>
                            <div className="signup__divider-line" />
                        </div>
                        <button
                            className="signup__email-button"
                            onClick={handleContinueWithEmail}
                        >
                            Continue with email
                        </button>

                        <p className="signup__login-link">
                            Already have an account?{" "}
                            <a href="/login" className="signup__login-text">
                                Sign In
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
