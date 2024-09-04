import { createSlice} from "@reduxjs/toolkit";


const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState: [],
  reducers: {
    addBookmark: (state, action) => {
      state.push(action.payload);
    },
    removeBookmark: (state, action) => {
      return state.filter((movie) => movie.id !== action.payload);
    },
    setBookmark: (state, action) => {
      return action.payload;
    },
  },
});

export const { addBookmark, removeBookmark, setBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
