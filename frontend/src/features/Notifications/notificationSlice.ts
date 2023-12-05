import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    fetchNotifications,
    fetchNotificationsSender,
} from "./notificationActions";
import { acceptFriendRequest } from "../friends/friendActions";

interface Notification {
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

interface NotificationState {
    notifications: Notification[];
    loading: boolean;
    error: string | null;
}

const initialState: NotificationState = {
    notifications: [],
    loading: true,
    error: null,
};

const notificationSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        removeNotification: (state, action: PayloadAction<string>) => {
            state.notifications = state.notifications.filter(
                (notification) => notification._id !== action.payload,
            );
        },
        addNotification: (state, action: PayloadAction<Notification>) => {
            state.notifications.push(action.payload);
        },
        fetchNotificationsFulfilled: (
            state,
            action: PayloadAction<Notification[]>,
        ) => {
            state.notifications = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const userId = action.meta.arg; // Extract the userId from the action meta
                const notifications = action.payload;

                // Filter out "FRIEND_REQUEST_ACCEPTED" type notifications for the receiver
                const receiverNotifications = notifications.filter(
                    (notification) =>
                        notification.receiver._id === userId &&
                        notification.type !== "FRIEND_REQUEST_ACCEPTED",
                );

                // Update the notification type for accepted friend requests
                const acceptedFriendRequests = notifications.filter(
                    (notification) =>
                        notification.receiver._id === userId &&
                        notification.type === "FRIEND_REQUEST_ACCEPTED",
                );

                const updatedReceiverNotifications = receiverNotifications.map(
                    (notification) => {
                        if (notification.type === "FRIEND_REQUEST_SENT") {
                            return {
                                ...notification,
                                message: `You received a friend request from ${notification.sender.displayName}.`,
                            };
                        } else {
                            return {
                                ...notification,
                                message: `${notification.sender.displayName} accepted your friend request.`,
                            };
                        }
                    },
                );

                state.notifications = updatedReceiverNotifications.concat(
                    acceptedFriendRequests,
                );
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        //for sender
        builder
            .addCase(fetchNotificationsSender.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotificationsSender.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.notifications = action.payload; // Update the state with the sender notifications
            })

            .addCase(fetchNotificationsSender.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        builder.addCase(acceptFriendRequest.fulfilled, (state, action) => {
            const senderId = action.payload;
            const userId = action.meta.arg; // Extract the userId from the action meta

            // Update the notification type to "FRIEND_REQUEST_ACCEPTED" only for the receiver
            const updatedNotifications = state.notifications.map((notification) =>
                notification.receiver._id === userId &&
                    notification.sender._id === senderId
                    ? {
                        ...notification,
                        type: "FRIEND_REQUEST_ACCEPTED",
                        message: `You accepted ${notification.receiver.displayName}'s friend request.`,
                    }
                    : notification,
            );

            state.notifications = updatedNotifications;
        });
    },
});

export const {
    removeNotification,
    addNotification,
    fetchNotificationsFulfilled,
} = notificationSlice.actions;
export default notificationSlice.reducer;
