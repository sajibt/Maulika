import { useState } from "react";

const ForgotPasswordForm = ({ onSubmit }) => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(email);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <label htmlFor="email" className="font-medium text-gray-600">
                Email
            </label>
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border rounded-md p-2"
                required
            />
            <button
                type="submit"
                className="bg-cyan-800 text-white py-2 px-4 rounded-md font-medium"
            >
                Send Reset Instructions
            </button>
        </form>
    );
};

export default ForgotPasswordForm;
