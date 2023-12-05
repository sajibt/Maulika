import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createConversation,
  getConversationsByUser,
  getConversationByMembers,
} from "./conversationActions";

interface Conversation {
  _id: string;
  members: string[];
}

interface ConversationState {
  conversations: Conversation[];
  loading: boolean;
  error: string | null;
}

const initialState: ConversationState = {
  conversations: [],
  loading: false,
  error: null,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createConversation.fulfilled, (state, action) => {
        state.conversations.push(action.payload);
      })
      .addCase(getConversationsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getConversationsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(getConversationsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error fetching conversations";
      })
      .addCase(getConversationByMembers.fulfilled, (state, action) => {
        state.conversations.push(action.payload);
      })
      .addCase(getConversationByMembers.rejected, (state, action) => {
        state.error = action.payload || "Error fetching conversation";
      });
  },
});

export default conversationSlice.reducer;
