import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import jwtDecode from "jwt-decode";
import { logoutUser } from "../features/user/userActions";

const useAuth = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => !!state.user.data);

    const logoutJwt = useCallback(async () => {
        await dispatch(logoutUser());
    }, [dispatch]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            const decodedToken = jwtDecode(token);

            const expiresIn = decodedToken.exp; // Expiration time in seconds
            const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

            if (currentTime > expiresIn) {
                logoutJwt(); // Automatically logout and redirect to login page
            }
        }
    }, [logoutJwt]);

    return { isAuthenticated, logoutJwt };
};

export default useAuth;
