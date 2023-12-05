import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { blockUser, fetchBlockedUsers, unblockUser } from "./blockActions";
import { User } from "../../types";

interface BlockState {
  blockedUsers: User[];
  loading: boolean;
  error: string | null;
}

const initialState: BlockState = {
  blockedUsers: [],
  loading: false,
  error: null,
};

const blockSlice = createSlice({
  name: "blocks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(blockUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(blockUser.fulfilled, (state, action) => {
        state.loading = false;
        state.blockedUsers.push(action.meta.arg); // Add the blocked user to the list
      })
      .addCase(blockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to block user";
      })
      .addCase(unblockUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unblockUser.fulfilled, (state, action) => {
        state.loading = false;
        state.blockedUsers = state.blockedUsers.filter(
          (userId) => userId !== action.meta.arg,
        ); // Remove the unblocked user from the list
      })
      .addCase(unblockUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to unblock user";
      })
      .addCase(fetchBlockedUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlockedUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.blockedUsers = action.payload; // Set the fetched blocked users list
      })
      .addCase(fetchBlockedUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch blocked users";
      });
  },
});

export default blockSlice.reducer;

// Selectors
export const selectBlockedUsers = (state: RootState) =>
  state.blocks.blockedUsers;
export const selectBlockLoading = (state: RootState) => state.blocks.loading;
export const selectBlockError = (state: RootState) => state.blocks.error;
