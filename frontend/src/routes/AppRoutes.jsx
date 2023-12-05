import { Route, Routes, Navigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import routeConfig from "../config/routeConfig";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../utilities/LoadingSpinner.jsx";
import { useEffect, useState } from "react";
import { fetchUser } from "../features/user/userActions";
import ColorRingWithCircle from "../utilities/ColorRingWithCircle";

const AppRoutes = () => {
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state) => state.user.data);
    const isLoggedIn = !!user;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser())
            .then(() => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 2000);
            })
            .catch(() => setIsLoading(false));
    }, [dispatch]);

    if (isLoading) {
        // return <LoadingSpinner visible={true} />;
        return <ColorRingWithCircle visible={true} />;
    }

    return (
        <>
            <Header isLoggedIn={isLoggedIn} />
            <Routes>
                {routeConfig.map((route) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            // if the user is logged in  Navigate to Home
                            isLoggedIn &&
                                (route.path === "/login" || route.path === "/signup") ? (
                                <Navigate to="/" />
                            ) : (
                                <route.component />
                            )
                        }
                    />
                ))}
            </Routes>
            <Footer />
        </>
    );
};

export default AppRoutes;
