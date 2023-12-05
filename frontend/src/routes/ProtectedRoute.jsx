import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element }) => {
    // Check if the user is authenticated
    const isAuthenticated = useSelector((state) => state.user.data !== null);

    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
