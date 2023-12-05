import axios from "axios";

// Function to get the JWT token from local storage or any other method you use to store the token
const getJwtToken = () => {
    return localStorage.getItem("token");
};

// Utility function to get the axios config based on the JWT token
const getAxiosConfig = (contentType) => {
    const jwtToken = getJwtToken();
    const headers = {};

    if (jwtToken) {
        headers["Authorization"] = `Bearer ${jwtToken}`;
    }

    if (contentType) {
        headers["Content-Type"] = contentType;
    }

    return {
        headers,
        withCredentials: jwtToken ? false : true,
    };
};

// Create an instance of axios with the default config
const instance = axios.create({
    baseURL: "http://localhost:5000/api/v1",
    timeout: 10000,
});

export { getAxiosConfig };
export default instance;
