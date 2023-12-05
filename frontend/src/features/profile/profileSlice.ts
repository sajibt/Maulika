import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";
import {
  checkUsername,
  fetchAllUsers,
  fetchUserProfile,
  updateProfile,
} from "./profileActions";

interface ProfileState {
  userProfile: User | null;
  loading: boolean;
  error: null;
  usernameAvailable: boolean;
  allUsers: User[];
}

const initialState: ProfileState = {
  userProfile: null,
  loading: false,
  error: null,
  usernameAvailable: true,
  allUsers: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching user profile";
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error updating user profile";
      });

    builder.addCase(checkUsername.fulfilled, (state, action) => {
      state.usernameAvailable = action.payload;
    });

    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.allUsers = action.payload;
    });

    builder.addCase(fetchAllUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Error fetching all users";
    });
  },
});

export default profileSlice.reducer;
