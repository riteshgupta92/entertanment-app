import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching movies

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({page, limit}, thunkAPI) => {
    try {
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=5feda587f1f255bcb4972ddf3e20720a&page=${page}&limit=${limit}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch movies");
      }
      const data = await response.json();
      return {
        movies: data.results,
        page : data.page || page,
        totalPages : data.tota_pages || Math.ceil(data.total_results / limit)
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
    page : 1,
    totalPages : 1
  },
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload.movies;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.movies = action.payload;
      });
  },
});

export const { setMovies } = movieSlice.actions;
export default movieSlice.reducer;
