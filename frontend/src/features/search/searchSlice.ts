import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk } from "../../store/store";
import { Note } from "../../types";

interface SearchState {
  searchResults: Note[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  searchResults: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchStart(state) {
      state.loading = true;
      state.error = null;
    },
    searchSuccess(state, action: PayloadAction<Note[]>) {
      state.searchResults = action.payload;
      state.loading = false;
      state.error = null;
    },
    searchFailure(state, action: PayloadAction<string>) {
      state.searchResults = [];
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { searchStart, searchSuccess, searchFailure } =
  searchSlice.actions;

export default searchSlice.reducer;
