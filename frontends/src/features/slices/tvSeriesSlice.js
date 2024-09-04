import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTvSeries = createAsyncThunk(
  "tvSeries/fetchTvSeries",
  async ({ page, limit }, thunkAPI) => {
    try {
      const url = `https://api.themoviedb.org/3/discover/tv?api_key=5feda587f1f255bcb4972ddf3e20720a&page=${page}&limit=${limit}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch TV series");
      }
      const data = await response.json();
      return {
        tvSeries: data.results,
        page: data.page || page,
        totalPages: data.tota_pages || Math.ceil(data.total_results / limit),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const tvSeriesSlice = createSlice({
  name: "tvSeries",
  initialState: {
    tvSeries: [],
    status: "idle",
    error: null,
    page : 1,
    totalPages : 1
  },
  reducers: {
    setTvSeries: (state, action) => {
      state.tvSeries = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTvSeries.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTvSeries.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tvSeries = action.payload.tvSeries;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages
      })
      .addCase(fetchTvSeries.rejected, (state, action) => {
        state.status = "failed";
        state.tvSeries = action.payload;
      });
  },
});

export const { setTvSeries } = tvSeriesSlice.actions;
export default tvSeriesSlice.reducer;
