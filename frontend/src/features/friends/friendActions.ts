import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axiosInstance";
import { RootState } from "../store/store";
import { Friend } from "../types";
import { getAxiosConfig } from "../../services/axiosInstance";

// Async thunk for fetching the friend list
export const fetchFriends = createAsyncThunk(
    "friends/fetchFriends",
    async (userId, { rejectWithValue }) => {
        try {
            const config = getAxiosConfig();
            const response = await axios.get(`/friends/${userId}`, config);

            return response.data; // Return the friend list data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

// Async thunk for sending friend request
export const sendFriendRequest = createAsyncThunk(
    "friends/sendFriendRequest",
    async (userId: string, { rejectWithValue }) => {
        try {
            const config = getAxiosConfig();
            const response = await axios.post(
                `/friends/sendRequest/${userId}`,
                null,
                config,
            );
            console.log(response.data.user, "actions add frineds");
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

// Async thunk for accepting friend request
export const acceptFriendRequest = createAsyncThunk(
    "friends/acceptFriendRequest",
    async (userId: string, { rejectWithValue }) => {
        try {
            const config = getAxiosConfig();
            const response = await axios.post(
                `/friends/acceptRequest/${userId}`,
                null,
                config,
            );

            console.log(response.data, "actions acceptfrineds");
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

// Async thunk for removing a friend
export const removeFriend = createAsyncThunk(
    "friends/removeFriend",
    async (userId: string, { rejectWithValue }) => {
        try {
            const config = getAxiosConfig();
            const response = await axios.delete(
                `/friends/removeFriend/${userId}`,
                config,
            );

            console.log(response.data.user, "actions  removefrineds");
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

// Async thunk for canceling a friend request
export const cancelFriendRequest = createAsyncThunk(
    "friends/cancelFriendRequest",
    async (userId: string, { rejectWithValue }) => {
        try {
            const config = getAxiosConfig();
            const response = await axios.delete(
                `/friends/cancelRequest/${userId}`,
                config,
            );

            console.log(response.data.user, "actions cancel friend request");
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

// Async thunk for rejecting a friend request
export const rejectFriendRequest = createAsyncThunk(
    "friends/rejectFriendRequest",
    async (userId: string, { rejectWithValue }) => {
        try {
            const config = getAxiosConfig();
            const response = await axios.delete(
                `/friends/rejectRequest/${userId}`,
                config,
            );

            console.log(response.data.user, "actions reject friend request");
            return response.data.user;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

// Async thunk for rejecting a friend request
// export const rejectFriendRequest = createAsyncThunk(
//   "friends/rejectFriendRequest",
//   async (userId: string, { rejectWithValue }) => {
//     try {
//       const config = getAxiosConfig();
//       await axios.delete(`/friends/rejectRequest/${userId}`, config);
//       return userId; // Return the userId so that we can update the state in the reducer
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   },
// );
