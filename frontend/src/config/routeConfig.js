import Login from "../components/Auth/Login/Login";
import Signup from "../components/Auth/Signup/Signup";
import SignupForm from "../components/Auth/Signup/SignupForm";
import Home from "../pages/Home";
import ResetPassword from "../components/Auth/Password/ResetPassword";
import Logout from "../components/Auth/Logout/Logout";

function createRoute(path, component, exact = false) {
    return {
        path,
        component,
        exact,
    };
}

const routeConfig = [
    createRoute("/", Home, true),
    createRoute("/signup/form", SignupForm),
    createRoute("/signup", Signup),
    createRoute("/login", Login),
    createRoute("/reset-password/:resetToken", ResetPassword),
];

export default routeConfig;
// isLoggedIn ? createRoute("/dashboard", DashboardPage) : null,
