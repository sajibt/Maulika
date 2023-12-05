import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { signInUser, signupUser } from "../../../features/user/userActions";

import { FiArrowLeft } from "react-icons/fi";

import "./SignupForm.scss"; // Import your SCSS file

const SignupForm = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
        username: "",
    });

    const [errorMsg, setErrorMsg] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleBackToSignup = () => {
        navigate("/signup");
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userData"));
        console.log(user, "fuck you signup");
        if (user) {
            dispatch(signInUser.fulfilled(user)); // Dispatch the user data to fulfill the state
        }
    }, [dispatch]);

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append("email", formData.email);
            data.append("password", formData.password);
            data.append("name", formData.name); // Make sure the name attribute is correct
            data.append("username", formData.username);

            // Dispatch the signupUser async thunk with the FormData object
            const resultAction = await dispatch(signupUser(data));
            const user = unwrapResult(resultAction);
            console.log(resultAction.payload);

            // Handle success, e.g., redirect to a new page or show a success message
            console.log("Signup successful!", user);
            // After successful signup, dispatch the fetchUser action
            // dispatch(fetchUser());

            navigate("/");
        } catch (error) {
            if (typeof error === "string") {
                setErrorMsg(error); // Set the specific error message in the state
            } else if (error.message) {
                setErrorMsg(error.message); // Set the generic error message from the backend response
            } else {
                setErrorMsg("Signup failed. Please try again later."); // Fallback generic error message
            }
        }
    };

    console.log(errorMsg, "msg");

    return (
        <div className="signup-form">
            <button className="signup-form__back-button" onClick={handleBackToSignup}>
                <FiArrowLeft size={20} />
            </button>

            <h2 className="signup-form__title">Sign up to Notescribe</h2>

            <form onSubmit={handleSubmit} className="signup-form__form">
                <div className="signup-form__field-group">
                    <div className="signup-form__field">
                        <label htmlFor="name" className="signup-form__label">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="signup-form__input"
                            required
                        />
                    </div>
                    <div className="signup-form__field">
                        <label htmlFor="username" className="signup-form__label">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="signup-form__input"
                            required
                        />
                    </div>

                    {errorMsg.includes("Username") && (
                        <p className="signup-form__error">{errorMsg}</p>
                    )}
                </div>

                <div className="signup-form__field">
                    <label htmlFor="email" className="signup-form__label">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="signup-form__input"
                        required
                    />
                    {errorMsg.includes("Email") && (
                        <p className="signup-form__error">{errorMsg}</p>
                    )}
                </div>

                <div className="signup-form__field">
                    <label htmlFor="password" className="signup-form__label">
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="signup-form__input"
                        required
                    />
                </div>

                {errorMsg &&
                    !errorMsg.includes("Email") &&
                    !errorMsg.includes("Username") && (
                        <p className="signup-form__error">{errorMsg}</p>
                    )}

                <button type="submit" className="signup-form__submit-button">
                    Create Account
                </button>
            </form>

            <p className="signup-form__login-link">
                Already have an account?{" "}
                <a href="/login" className="signup-form__login-text">
                    Sign In
                </a>
            </p>
        </div>
    );
};

export default SignupForm;
