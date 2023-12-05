import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axiosInstance";
import { RootState } from "../../store/store";
import { getAxiosConfig } from "../../services/axiosInstance";
import { User } from "../../types";

//  async thunk for fetching user followers
export const fetchUserFollowers = createAsyncThunk<
  User[],
  string,
  { state: RootState }
>(
  "followers/fetchUserFollowers",
  async (userId, { getState, rejectWithValue }) => {
    try {
      const config = getAxiosConfig();
      const response = await axios.get<User[]>(
        `/subscriptions/${userId}/followers`,
        config,
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch followers");
    }
  },
);
