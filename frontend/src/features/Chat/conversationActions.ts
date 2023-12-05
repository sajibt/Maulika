import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axiosInstance";
import { getAxiosConfig } from "../../services/axiosInstance";

interface Conversation {
  _id: string;
  members: string[];
}

export const createConversation = createAsyncThunk<Conversation, string[]>(
  "conversation/createConversation",
  async (members, { rejectWithValue }) => {
    try {
      const config = getAxiosConfig("application/json");
      const response = await axios.post("/conversations", { members }, config);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to create a conversation");
    }
  },
);

//chat
export const getConversationsByUser = createAsyncThunk<Conversation[], string>(
  "conversation/getConversationsByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const config = getAxiosConfig();
      const response = await axios.get(`/conversations/${userId}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch conversations");
    }
  },
);

//multi data
export const getConversationByMembers = createAsyncThunk<
  Conversation,
  string[]
>(
  "conversation/getConversationByMembers",
  async (user1, user2, { rejectWithValue }) => {
    try {
      const config = getAxiosConfig();
      const response = await axios.get(
        `/conversations/find/${user1}/${user2}`,
        config,
      );
      console.log(response.data, ";daa from getConversationByMembers, ");

      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch conversation");
    }
  },
);
