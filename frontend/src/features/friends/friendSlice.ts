import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { User } from "../../types";
import {
    sendFriendRequest,
    acceptFriendRequest,
    removeFriend,
    cancelFriendRequest,
    rejectFriendRequest,
    fetchFriends,
} from "./friendActions.ts";

interface FriendState {
    friends: User[];
    friendReqSent: string[];
    friendReqRcv: string[];
    loading: boolean;
    error: string | null;
}

const initialState: FriendState = {
    friends: [],
    friendReqSent: [],
    friendReqRcv: [],
    loading: true,
    error: null,
};

const friendSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {
        // Add other friend-related reducers here if needed
        // For example:
        // removeFriend: (state, action: PayloadAction<string>) => {
        //   state.friends = state.friends.filter((friend) => friend._id !== action.payload);
        // },
        setSentFriendRequests: (state, action: PayloadAction<string[]>) => {
            state.friendReqSent = action.payload; // Use friendReqSent instead of friendRequestsSent
        },
        setReceivedFriendRequests: (state, action: PayloadAction<string[]>) => {
            state.friendReqRcv = action.payload; // Use friendReqRcv instead of friendRequestsRcv
        },
        setFriends: (state, action: PayloadAction<User[]>) => {
            state.friends = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchFriends.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchFriends.fulfilled,
                (state, action: PayloadAction<User[]>) => {
                    state.loading = false;
                    state.error = null;
                    state.friends = action.payload; // Update the friends array with the fetched data
                },
            )
            .addCase(fetchFriends.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(sendFriendRequest.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                sendFriendRequest.fulfilled,
                (state, action: PayloadAction<User>) => {
                    // Handle the fulfilled state after sending friend request if needed
                    state.loading = false;
                },
            )
            .addCase(sendFriendRequest.rejected, (state, action) => {
                // Handle the rejected state after sending friend request if needed
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(
                acceptFriendRequest.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.loading = false;
                    const acceptedFriend = action.payload; // Get the accepted friend object

                    // Add the new friend to the user's friends list
                    state.friends.push(acceptedFriend);

                    // Update friendReqRcv based on acceptedFriend.friendReqRcv
                    state.friendReqRcv = acceptedFriend.friendReqRcv || [];

                    // Remove the accepted friend from friendReqSent
                    state.friendReqSent = state.friendReqSent.filter(
                        (friendId) => friendId !== acceptedFriend._id,
                    );
                },
            )

            .addCase(acceptFriendRequest.rejected, (state, action) => {
                // Handle the rejected state after accepting friend request if needed
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(
                removeFriend.fulfilled,
                (state, action: PayloadAction<string>) => {
                    // Handle the fulfilled state after removing friend if needed
                    state.loading = false;

                    // Remove the friend from the user's friends list
                    state.friends = state.friends.filter(
                        (friend) => friend._id !== action.payload,
                    );
                },
            )
            .addCase(removeFriend.rejected, (state, action) => {
                // Handle the rejected state after removing friend if needed
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(
                cancelFriendRequest.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.loading = false;
                    console.log(action.payload);

                    // Remove the canceled friend request from friendReqSent
                    state.friendReqSent = state.friendReqSent.filter(
                        (friendId) => friendId !== action.payload._id,
                    );
                },
            )
            .addCase(cancelFriendRequest.rejected, (state, action) => {
                // Handle the rejected state after canceling friend request if needed
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(
                rejectFriendRequest.fulfilled,
                (state, action: PayloadAction<string>) => {
                    state.loading = false;
                    console.log(action.payload, "fuuuuuuk you");

                    // Update the friendReqRcv array correctly
                    state.friendReqRcv = state.friendReqRcv.filter(
                        (friendId) => friendId !== action.payload._id,
                    );
                },
            )
            .addCase(rejectFriendRequest.rejected, (state, action) => {
                // Handle the rejected state after rejecting friend request if needed
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setSentFriendRequests, setReceivedFriendRequests, setFriends } =
    friendSlice.actions; // Export the new action creators

export default friendSlice.reducer;
