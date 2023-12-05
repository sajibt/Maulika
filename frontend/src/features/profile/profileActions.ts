import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axiosInstance";
import { User } from "../../types";
import { getAxiosConfig } from "../../services/axiosInstance";

export const fetchUserProfile = createAsyncThunk<User, string>(
  "profile/fetchUserProfile",
  async (userId, { rejectWithValue }) => {
    try {
      const config = getAxiosConfig();
      const response = await axios.get(`/user/profile/${userId}`, config);
      return response.data.user;
    } catch (error) {
      return rejectWithValue("Failed to fetch user profile");
    }
  },
);

//fetch all users
export const fetchAllUsers = createAsyncThunk<User[], void>(
  "profile/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const config = getAxiosConfig();
      const response = await axios.get("/user/allUsers", config);
      return response.data.users;
    } catch (error) {
      return rejectWithValue("Failed to fetch all users");
    }
  },
);

export const updateProfile = createAsyncThunk<User, User>(
  "profile/updateProfile",
  async (updatedProfile, { rejectWithValue }) => {
    try {
      // const config = getAxiosConfig("application/json"); // Use axios config with content type
      const config = getAxiosConfig("multipart/form-data"); // Use axios config with content type
      const response = await axios.patch(
        "http://localhost:5000/user/profile/update",
        updatedProfile,
        config,
      );

      console.log(response.data.user, "profile update data ? ");

      return response.data.user;
    } catch (error) {
      if (error.response?.data?.error) {
        // Return the specific error message to be handled in the component
        return rejectWithValue(error.response.data.error);
      }
      // If no error message is found in the response, throw a generic error
      throw new Error(error.response?.data || "Update profile failed");
    }
  },
);

//check username avaiabilit

export const checkUsername = createAsyncThunk(
  "profile/checkUsername",
  async (username, { rejectWithValue }) => {
    try {
      const config = getAxiosConfig();

      const response = await axios.get(
        `/user/username-check?username=${username}`,
        config,
      );
      console.log(response.data.available, "available?");
      return response.data.available;
    } catch (error) {
      return rejectWithValue("Failed to check username availability");
    }
  },
);
