import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types";
import {
  fetchUserSubscriptions,
  subscribeUser,
  unsubscribeUser,
} from "./subscriptionsActions";

interface SubscriptionsState {
  subscribedUsers: {
    subscriptions: User[]; // An array to store subscribed users
  };
  loading: boolean;
  error: string | null;
}

const initialState: SubscriptionsState = {
  subscribedUsers: {
    subscriptions: [], // Initialize subscriptions as an empty array
  },
  loading: false,
  error: null,
};

const subscriptionsSlice = createSlice({
  name: "subscriptions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUserSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.subscribedUsers.subscriptions = action.payload;
        console.log(state.subscribedUsers.subscriptions, "hey from buiolder");
      })

      .addCase(fetchUserSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch subscriptions";
      })

      .addCase(subscribeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(subscribeUser.fulfilled, (state, action) => {
        state.loading = false;
        const subscribedUser = action.payload;

        // Make sure subscribedUsers.subscriptions is an array
        if (!Array.isArray(state.subscribedUsers.subscriptions)) {
          state.subscribedUsers.subscriptions = [];
        }

        // Update the subscriptions array by creating a new array
        state.subscribedUsers.subscriptions = [
          ...state.subscribedUsers.subscriptions,
          subscribedUser,
        ];
      })
      .addCase(subscribeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to subscribe";
      })

      .addCase(unsubscribeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // .addCase(unsubscribeUser.fulfilled, (state, action) => {
      //   state.loading = false;
      //   const unsubscribedUserId = action.payload;
      //
      //   // Make sure subscribedUsers.subscriptions is an array
      //   if (!Array.isArray(state.subscribedUsers.subscriptions)) {
      //     state.subscribedUsers.subscriptions = [];
      //   }
      //
      //   // Update the subscriptions array directly
      //   state.subscribedUsers.subscriptions =
      //     state.subscribedUsers.subscriptions.filter(
      //       (subscription) => subscription._id !== unsubscribedUserId,
      //     );
      // })

      .addCase(unsubscribeUser.fulfilled, (state, action) => {
        state.loading = false;
        const unsubscribedUserId = action.payload;

        // Make sure subscribedUsers.subscriptions is an array
        if (!Array.isArray(state.subscribedUsers.subscriptions)) {
          state.subscribedUsers.subscriptions = [];
        }

        // Update the subscriptions array by creating a new array with the user removed
        state.subscribedUsers.subscriptions =
          state.subscribedUsers.subscriptions.filter(
            (subscription) => subscription._id !== unsubscribedUserId,
          );
      })

      .addCase(unsubscribeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to unsubscribe";
      });
  },
});

export default subscriptionsSlice.reducer;
