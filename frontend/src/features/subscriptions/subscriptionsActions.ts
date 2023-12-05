import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axiosInstance";
import { RootState } from "../../store/store";
import { getAxiosConfig } from "../../services/axiosInstance";
import { User } from "../../types";

// Create async thunk for fetching user subscriptions
export const fetchUserSubscriptions = createAsyncThunk<
  User[],
  string,
  { state: RootState }
>(
  "subscriptions/fetchUserSubscriptions",
  async (userId, { getState, rejectWithValue }) => {
    try {
      const config = getAxiosConfig();
      const response = await axios.get<User[]>(
        `/subscriptions/${userId}/subscriptions`,
        config,
      );
      console.log(response.data, "resss");
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch subscriptions");
    }
  },
);

// Create async thunk for subscribing a user
export const subscribeUser = createAsyncThunk<
  User,
  string,
  { state: RootState }
>(
  "subscriptions/subscribeUser",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const currentUserId = state.user.data?._id;
      if (!currentUserId) {
        throw new Error("User not found");
      }

      const config = getAxiosConfig();
      await axios.post(`subscriptions/subscribe/${userId}`, null, config);

      // After subscribing, fetch the updated list of subscribed users
      const response = await axios.get<User[]>(
        `/subscriptions/${currentUserId}/subscriptions`,
        config,
      );
      console.log(response.data, "this is subscribe user? ");
      const updatedUser = response.data; // Since the response will be an array of users
      return updatedUser; // Return the updated user object
    } catch (error) {
      console.error(error);
      throw new Error(error.response?.data || "Failed to subscribe");
    }
  },
);

// Create async thunk for unsubscribing a user
export const unsubscribeUser = createAsyncThunk<
  User,
  string,
  { state: RootState }
>(
  "subscriptions/unsubscribeUser",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const state = getState();
      const currentUserId = state.user.data?._id;
      if (!currentUserId) {
        throw new Error("User not found");
      }

      const config = getAxiosConfig();
      await axios.post(`subscriptions/unsubscribe/${userId}`, null, config);

      // After unsubscribing, fetch the updated list of subscribed users
      const response = await axios.get<User[]>(
        `/subscriptions/${currentUserId}/subscriptions`,
        config,
      );
      console.log(response.data, "this is unsubscribe user? ");
      const updatedUser = response.data;
      return updatedUser; // Return the updated user object
    } catch (error) {
      console.error(error);
      throw new Error(error.response?.data || "Failed to unsubscribe");
    }
  },
);
