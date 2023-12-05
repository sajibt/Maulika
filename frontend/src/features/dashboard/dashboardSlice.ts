import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/store";
import { Note, User } from "../../types";
import { fetchDashboardData, updateNote, deleteNote } from "./dashboardActions";

interface DashboardState {
  notes: Note[];
  loading: boolean;
}

const initialState: DashboardState = {
  notes: [],
  loading: true,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch data success case
    builder.addCase(fetchDashboardData.fulfilled, (state, action) => {
      state.notes = action.payload.notes;
      state.loading = false;
    });
    // Fetch data error case
    builder.addCase(fetchDashboardData.rejected, (state) => {
      state.loading = false;
    });
    // Delete note success case

    builder.addCase(deleteNote.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      deleteNote.fulfilled,
      (state, action: PayloadAction<string>) => {
        const deletedNoteId = action.payload;
        state.notes = state.notes.filter((note) => note._id !== deletedNoteId);
        state.loading = false;
      }
    );

    builder.addCase(
      deleteNote.rejected,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );

    builder.addCase(updateNote.pending, (state) => {
      // Handle the pending state for the updateNote thunk
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      updateNote.fulfilled,
      (state, action: PayloadAction<Note>) => {
        // Handle the fulfilled (success) state for the updateNote thunk
        state.loading = false;
        state.error = null;

        // Update the state with the edited note
        const updatedNote = action.payload;
        state.notes = state.notes.map((note) =>
          note._id === updatedNote._id ? updatedNote : note
        );
      }
    );
    builder.addCase(
      updateNote.rejected,
      (state, action: PayloadAction<string>) => {
        // Handle the rejected state for the updateNote thunk
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export default dashboardSlice.reducer;
