import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types";
import { fetchUserFollowers } from "./followersActions";

interface FollowersState {
  followers: User[];
  loading: boolean;
  error: string | null;
}

const initialState: FollowersState = {
  followers: [],
  loading: false,
  error: null,
};

const followersSlice = createSlice({
  name: "followers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFollowers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserFollowers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.followers = action.payload;
        console.log(state.followers, "followers adn following data?");
      })
      .addCase(fetchUserFollowers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch followers";
      });
  },
});

export default followersSlice.reducer;
