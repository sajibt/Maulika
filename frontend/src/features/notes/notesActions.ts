import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../services/axiosInstance";
import { RootState } from "../store/store";
import { Note } from "../types";
import notesSlice from "./notesSlice";
import { getAxiosConfig } from "../../services/axiosInstance";

// export const fetchNotes = createAsyncThunk(
//   "notes/fetchNotes",
//   async (_, { rejectWithValue }) => {
//     try {
//       const config = getAxiosConfig();
//       const response = await axios.get("/notes", config);
//
//       return response.data.notes;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   },
// );

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const config = getAxiosConfig();
      const response = await axios.get(
        `/notes?page=${page}&limit=${limit}`,
        config,
      );
      console.log(response.data, "notes data????");

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//Async thunk for add a note
export const addNote = createAsyncThunk(
  "notes/addNote",
  async (newNote: Note, { rejectWithValue }) => {
    try {
      const config = getAxiosConfig();
      const response = await axios.post("/notes/add", newNote, config);
      console.log(response.data, "data add");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk to update a note
export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async (
    { noteId, editedNote }: { noteId: string; editedNote: Note },
    { rejectWithValue },
  ) => {
    try {
      const config = getAxiosConfig();
      const response = await axios.put(
        `/notes/${noteId}`, // Replace with your backend API endpoint for updating notes
        editedNote,
        config,
      );

      console.log("Note updated inside noteslice?:", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk for fetching user-specific notes
export const fetchUserNotes = createAsyncThunk(
  "userNotes/fetchUserNotes",
  async (userId, { rejectWithValue }) => {
    try {
      const config = getAxiosConfig();
      const response = await axios.get(`/notes/user/${userId}`, config);
      return response.data.data; // Return the notes array from the response
    } catch (error) {
      return rejectWithValue("Failed to fetch user notes");
    }
  },
);

//Delte notes
export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (noteId: string, { rejectWithValue }) => {
    try {
      const config = getAxiosConfig();
      await axios.delete(`/notes/${noteId}`, config);
      return noteId; // Return the ID of the deleted note
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async thunk for adding a note to favorites
// export const addToFavorites = createAsyncThunk(
//   "notes/addToFavorites",
//   async (noteId: string, { rejectWithValue }) => {
//     try {
//       const config = getAxiosConfig();
//       await axios.post(`/notes/${noteId}/favorite`, null, config);
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   },
// );

export const toggleFavorite = createAsyncThunk(
  "notes/toggleFavorite",
  async (noteId: string, { rejectWithValue }) => {
    try {
      const config = getAxiosConfig();
      const response = await axios.post(
        `/notes/${noteId}/favorite`,
        null,
        config,
      );

      console.log(response.data, "fuckkkk you? ");
      // return response.data.note;
      return response.data.note;
      // return noteId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Async Thunk for noters
export const fetchNotersNotes = createAsyncThunk(
  "notes/fetchNotersNotes",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state: RootState = getState();
      const userId = state.user.data?._id;

      if (!userId) {
        throw new Error("User ID not found.");
      }

      const config = getAxiosConfig();

      // Pass the userId as a query parameter in the request
      const response = await axios.get(`/notes/noters/${userId}`, config);
      console.log(response.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

//Async thunk for Friends

export const fetchFriendNotes = createAsyncThunk(
  "notes/fetchFriendNotes",
  async (_, { rejectWithValue }) => {
    try {
      const config = getAxiosConfig();
      const response = await axios.get("/notes/friends", config);

      // The backend already returns the friend notes, so no need to filter
      console.log(response.data, "data? ");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
