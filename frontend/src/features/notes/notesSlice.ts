import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store/store";
import { Note } from "../../types";
import {
  fetchNotes,
  addNote,
  updateNote,
  fetchUserNotes,
  deleteNote,
  toggleFavorite,
  fetchNotersNotes,
  fetchFriendNotes,
} from "./notesActions.ts";

interface NotesState {
  notes: Note[];
  totalNotesCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: NotesState = {
  notes: [],
  totalNotesCount: 0,
  loading: true,
  error: null,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    // updateNoteAfterFav: (state, action: PayloadAction<Note>) => {
    //   // Update the note in the Redux store
    //   const noteId = action.payload;
    //   const favoritesSet = new Set(state.notes.favorites); // Convert favorites array to a set
    //   if (favoritesSet.has(noteId)) {
    //     favoritesSet.delete(noteId);
    //   } else {
    //     favoritesSet.add(noteId);
    //   }
    //
    //   // Convert the set back to an array and update the state
    //   state.notes.favorites = Array.from(favoritesSet);
    // },

    updateNoteAfterFav: (
      state,
      action: PayloadAction<{ noteId: string; favorites: string[] }>,
    ) => {
      const { noteId, favorites } = action.payload;
      state.notes = state.notes.map((note) => {
        if (note._id === noteId) {
          return { ...note, favorites };
        }
        return note;
      });
    },
  },
  extraReducers: (builder) => {
    //fetch notes
    builder.addCase(fetchNotes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      fetchNotes.fulfilled,
      (state, action: PayloadAction<{ notes: Note[]; totalCount: number }>) => {
        state.notes = action.payload.notes;
        state.totalNotesCount = action.payload.totalCount; // Update totalNotesCount
        state.loading = false;
      },
    );

    builder.addCase(
      fetchNotes.rejected,
      (state, action: PayloadAction<string>) => {
        state.loading = false;

        state.error = action.error.message || "Failed to add note";
      },
    );

    //add notes
    builder.addCase(addNote.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // builder.addCase(addNote.fulfilled, (state, action: PayloadAction<Note>) => {
    //   state.notes.push(action.payload);
    //   state.loading = false;
    // });
    builder.addCase(addNote.fulfilled, (state, action: PayloadAction<Note>) => {
      // Add the new note to the state's notes array
      // state.notes.push(action.payload);
      // state.notes = [...state.notes, action.payload.note];
      // state.notes = [...state.notes, action.payload];
      state.loading = false;
    });

    builder.addCase(addNote.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "Failed to add note";
    });

    // builder.addCase(
    //   addNote.rejected,
    //   (state, action: PayloadAction<string>) => {
    //     state.loading = false;
    //     state.error = action.error.message || "Failed to add note";
    //   },
    // );

    //update notes
    builder.addCase(
      updateNote.fulfilled,
      (state, action: PayloadAction<Note>) => {
        // Update the state with the edited note

        const updatedNote = action.payload;
        state.notes = state.notes.map((note) =>
          note._id === updatedNote._id ? updatedNote : note,
        );
        state.loading = false;
      },
    );

    builder.addCase(
      updateNote.rejected,
      (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      },
    );

    // Update this part to store the user-specific notes in state.notes
    builder
      .addCase(fetchUserNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserNotes.fulfilled,
        (state, action: PayloadAction<Note[]>) => {
          state.notes = action.payload; // Update state.notes instead of state.data
          state.loading = false;
        },
      )
      .addCase(fetchUserNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
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
      },
    );

    builder.addCase(
      deleteNote.rejected,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );

    //for add to fav case
    // Toggle favorite

    builder
      .addCase(toggleFavorite.pending, (state) => {})

      // .addCase(
      //   toggleFavorite.fulfilled,
      //   (state, action: PayloadAction<Note>) => {
      //     // Find the index of the updated note in the state
      //     const updatedNote = action.payload;
      //     const index = state.notes.findIndex(
      //       (note) => note._id === updatedNote._id,
      //     );
      //
      //     if (index !== -1) {
      //       // Update the note's favorites field in the state with the new data
      //       state.notes[index].favorites = updatedNote.favorites;
      //       state.notes[index].favoritesCount = updatedNote.favorites.length;
      //     }
      //   },
      // )
      .addCase(
        toggleFavorite.fulfilled,
        (state, action: PayloadAction<Note>) => {
          // Find the updated note in the state.notes array
          const updatedNote = action.payload;
          const noteToUpdate = state.notes.find(
            (note) => note._id === updatedNote._id,
          );

          if (noteToUpdate) {
            // Update the note's favorites field in the state with the new data
            noteToUpdate.favorites = updatedNote.favorites;
            noteToUpdate.favoritesCount = updatedNote.favorites.length;
          }
        },
      )

      .addCase(toggleFavorite.rejected, (state, action) => {});

    // For Noters
    builder.addCase(fetchNotersNotes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(
      fetchNotersNotes.fulfilled,
      (state, action: PayloadAction<Note[]>) => {
        state.notes = action.payload;
        state.loading = false;
      },
    );

    builder.addCase(
      fetchNotersNotes.rejected,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      },
    );

    //for frineds notes
    builder
      .addCase(fetchFriendNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFriendNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.loading = false;
      })
      .addCase(fetchFriendNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updateNoteAfterFav } = notesSlice.actions;
export default notesSlice.reducer;
