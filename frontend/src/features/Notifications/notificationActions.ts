// notificationActions.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axiosInstance";
import { getAxiosConfig } from "../../services/axiosInstance";

export interface Notification {
    _id: string;
    sender: {
        _id: string;
        displayName: string;
        username: string;
        image: string;
    };
    receiver: {
        _id: string;
        displayName: string;
        username: string;
        image: string;
    };
    type: string;
    message: string;
    notificationFor: string;
}

// Async thunk for fetching notifications
export const fetchNotifications = createAsyncThunk(
    "notifications/fetchNotifications",
    async (userId: string, { rejectWithValue }) => {
        try {
            const config = getAxiosConfig();
            const response = await axios.get(
                `/friends/notifications/${userId}`,
                config,
            );

            console.log(response.data, "data for notification receiver");

            return response.data; // Return the notification data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);

//user is the sender, so don't need to pass the userId
// Async thunk for fetching notifications where the user is the sender
export const fetchNotificationsSender = createAsyncThunk(
    "notifications/fetchNotificationsSender",
    async (_, { rejectWithValue }) => {
        // No need to pass userId here
        try {
            const config = getAxiosConfig();
            const response = await axios.get(
                `/friends/notifications/sender`, // Update the URL here
                config,
            );
            console.log(response.data, "fetch sender data?");

            return response.data; // Return the notification data
        } catch (error) {
            return rejectWithValue(error.message);
        }
    },
);
