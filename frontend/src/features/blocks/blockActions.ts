import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAxiosConfig } from "../../services/axiosInstance";
import axios from "../../services/axiosInstance";

// Async thunk for blocking a user
export const blockUser = createAsyncThunk<void, string>(
  "blocks/blockUser",
  async (userId, { rejectWithValue }) => {
    try {
      const config = getAxiosConfig();

      await axios.post(`/blocks/block/${userId}`, null, config);
    } catch (error) {
      console.error("Failed to block user:", error);
      return rejectWithValue("Failed to block user");
    }
  },
);

// Async thunk for unblocking a user
export const unblockUser = createAsyncThunk<void, string>(
  "blocks/unblockUser",
  async (userId, { rejectWithValue }) => {
    try {
      const config = getAxiosConfig();
      await axios.post(`/blocks/unblock/${userId}`, null, config);
      console.log(config, "config");
    } catch (error) {
      console.error("Failed to unblock user:", error);
      return rejectWithValue("Failed to unblock user");
    }
  },
);

// Async thunk to fetch blocked users
export const fetchBlockedUsers = createAsyncThunk(
  "blocks/fetchBlockedUsers",
  async (_, { rejectWithValue }) => {
    try {
      const config = getAxiosConfig();

      const response = await axios.get("/blocks/blockedUser", config);
      console.log(response.data, "data");
      return response.data; // Return the list of blocked users
    } catch (error) {
      console.error("Failed to fetch blocked users:", error);
      return rejectWithValue("Failed to fetch blocked users");
    }
  },
);
