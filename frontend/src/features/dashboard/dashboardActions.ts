import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axiosInstance";
import { RootState } from "../store/store";
import { Note, User } from "../../types";
import dashboardSlice from "./dashboardSlice";
import { getAxiosConfig } from "../../services/axiosInstance";

// Async thunk to fetch dashboard data
export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const config = getAxiosConfig();

      const response = await axios.get(
        "http://localhost:5000/dashboard",
        config
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to update a note
export const updateNote = createAsyncThunk(
  "dashboard/updateNote",
  async ({ noteId, editedNote }: { noteId: string; editedNote: Note }) => {
    try {
      const response = await axios.put(
        `/notes/${noteId}`, // Use the same API endpoint as in the notesSlice
        editedNote
      );

      console.log("Note updated: dashboard", response.data);
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }
);
// Async thunk to delete a note
export const deleteNote = createAsyncThunk(
  "dashboard/deleteNote",
  async (noteId: string, { rejectWithValue }) => {
    try {
      const config = getAxiosConfig();
      await axios.delete(`http://localhost:5000/notes/${noteId}`, config);

      return noteId; // Return the deleted noteId to use in the reducer
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
