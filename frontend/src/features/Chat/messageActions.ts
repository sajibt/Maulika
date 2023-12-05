import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axiosInstance";
import { getAxiosConfig } from "../../services/axiosInstance";
interface Message {
  _id: string;
  text: string;
  sender: string;
  createdAt: number;
}

export const createMessage = createAsyncThunk<Message, Message>(
  "message/createMessage",
  async (newMessage, { rejectWithValue }) => {
    console.log(newMessage, "newmessss");
    try {
      const config = getAxiosConfig("application/json");
      const response = await axios.post("/messages", newMessage, config);
      console.log(response.data, "data????");
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to create a message");
    }
  },
);

export const fetchMessages = createAsyncThunk<Message[], string>(
  "message/fetchMessages",
  async (conversationId, { rejectWithValue }) => {
    try {
      const config = getAxiosConfig();
      const response = await axios.get(`/messages/${conversationId}`, config);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch messages");
    }
  },
);
