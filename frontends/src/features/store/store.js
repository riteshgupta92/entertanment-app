import { configureStore } from "@reduxjs/toolkit";
import bookmarkReducer from "../slices/bookmarkSlice";
import movieReducer from "../slices/movieSlice";
import tvSeriesReducer from "../slices/tvSeriesSlice";


const store = configureStore({
    reducer : {
        "bookmarks" : bookmarkReducer,
        "movies" : movieReducer,
        "tvSeries" : tvSeriesReducer
    }
})


export default store