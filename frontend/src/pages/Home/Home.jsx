import { useSelector } from "react-redux";
import "./Home.scss";

const Home = () => {
    // Retrieve user data from Redux store
    const userData = useSelector((state) => state.user.data);

    return (
        <div className="home-container">
            <h1>Welcome to the Home Page</h1>
            {userData ? (
                <div className="user-data">
                    <h2>User Information:</h2>
                    <p>Name: {userData.displayName}</p>
                    <p>Email: {userData.email}</p>
                </div>
            ) : (
                <p>Please log in to view user data.</p>
            )}
        </div>
    );
};

export default Home;
