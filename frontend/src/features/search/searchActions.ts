import { AppThunk } from "../../store/store";
import axios from "../../services/axiosInstance";
import { searchStart, searchSuccess, searchFailure } from "./searchSlice";

// Action to perform the search
export const searchNotes =
  (searchTerm: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(searchStart());
      const response = await axios.get(`/search?query=${searchTerm}`); // Include the searchTerm in the request URL
      console.log("search", response.data);
      dispatch(searchSuccess(response.data));
    } catch (error) {
      dispatch(searchFailure("Failed to perform search."));
    }
  };
