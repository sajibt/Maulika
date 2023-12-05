import { useSelector } from "react-redux";
import useAuth from "../../../Hooks/useAuth.js";
import { useNavigate } from "react-router-dom";
import "./Logout.scss";

import { RiLogoutCircleRLine } from "react-icons/ri";

const Logout = () => {
    const user = useSelector((state) => state.user.data);
    const { logoutJwt } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        if (user?.googleId) {
            window.open("http://localhost:5000/api/v1/auth/logout", "_self");
        } else {
            await logoutJwt();
            navigate("/login");
        }
    };

    return (
        <button className="header__nav-link lb" onClick={handleLogout}>
            <RiLogoutCircleRLine />
            Logout
        </button>
    );
};

export default Logout;
