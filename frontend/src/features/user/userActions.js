import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axiosInstance";
import { getAxiosConfig } from "../../services/axiosInstance";

// Async thunk for fetching the user
export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async (_, { getState }) => {
        try {
            const state = getState();
            const userData = state.user.data;

            if (userData) {
                return userData;
            }

            const config = getAxiosConfig();
            const response = await axios.get("/auth/user", config);

            return response.data.user;
        } catch (error) {
            throw new Error("Failed to fetch user");
        }
    },
);

// Async thunk for signupUser
export const signupUser = createAsyncThunk(
    "user/signup",
    async (formData, { rejectWithValue }) => {
        try {
            const objectData = {};
            formData.forEach((value, key) => {
                objectData[key] = value;
            });

            const userData = JSON.stringify(objectData);
            const config = getAxiosConfig("application/json");
            const response = await axios.post("/auth/signup", userData, config);
            console.log(response, "response?");

            const { token, user } = response.data;

            localStorage.setItem("token", token);

            return user;
        } catch (error) {
            console.log(error, "error");
            if (error.response?.data?.message) {
                return rejectWithValue(error.response.data.message);
            }

            throw new Error(error.response?.data || "Signup failed");
        }
    },
);

// Async thunk for user login
export const signInUser = createAsyncThunk(
    "user/signin",
    async ({ email, password, rememberMe }) => {
        try {
            const response = await axios.post("/auth/signin", {
                email,
                password,
                rememberMe,
            });

            console.log(response.data, "response data ");

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userData", JSON.stringify(response.data.user));

            return response.data.user;
        } catch (error) {
            throw new Error(error.response?.data || "Login failed");
        }
    },
);

// Async thunk for user logout
export const logoutUser = createAsyncThunk(
    "user/logout",
    async (_, { getState }) => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
        } catch (error) {
            console.error(error);
        }
    },
);

// Async thunk for forgotPassword
export const forgotPassword = createAsyncThunk(
    "user/forgotPassword",
    async ({ email }) => {
        try {
            const config = getAxiosConfig();

            await axios.post("/auth/forgot-password", { email }, config);
        } catch (error) {
            throw new Error(
                error.response?.data || "Failed to send reset password email",
            );
        }
    },
);

// Async Thunk for resetPassword
export const resetPassword = createAsyncThunk(
    "user/resetPassword",
    async ({ resetToken, newPassword }) => {
        try {
            const config = getAxiosConfig();

            await axios.post(
                `/auth/reset-password/${resetToken}`,
                {
                    newPassword,
                },
                config,
            );
        } catch (error) {
            throw new Error(error.response?.data || "Failed to reset password");
        }
    },
);
