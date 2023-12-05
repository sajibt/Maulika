import { useState } from "react";
// import PropTypes from "prop-types";

const LoginForm = ({ onSubmit }) => {
    // LoginForm.propTypes = {
    //     onSubmit: PropTypes.func.isRequired, // Add the onSubmit prop validation
    // };

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        onSubmit(email, password, rememberMe);
    };

    return (
        <form className="login-form" onSubmit={handleFormSubmit}>
            <div className="login-form__field">
                <label className="login-form__label" htmlFor="email">
                    Email:
                </label>
                <input
                    className="login-form__input"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="login-form__field">
                <label className="login-form__label" htmlFor="password">
                    Password:
                </label>
                <input
                    className="login-form__input"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <div className="login-form__field">
                <label className="login-form__checkbox">
                    <input
                        className="login-form__checkbox-input"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <span className="login-form__checkbox-text">Remember Me</span>
                </label>
            </div>
            <button className="login-form__button" type="submit">
                Login
            </button>
        </form>
    );
};

export default LoginForm;
