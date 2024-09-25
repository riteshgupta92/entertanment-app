import React, { useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { removeBookmark, setBookmark } from "../features/slices/bookmarkSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BookmarkPage = () => {
  // Access bookmarks from the Redux store
  const bookmarkMovies = useSelector((state) => state.bookmarks);

  // Get the dispatch function from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchBookmark = async () => {
      const token = localStorage.getItem("accessToken");

      try {
        const response = await fetch(
          "https://entertanment-app.onrender.com/api/bookmark",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch bookmarks");
        }
        const data = await response.json();
        dispatch(setBookmark(data.bookmarks || []));
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookmark();
  }, [dispatch]);

  const handleRemoveBookmark = async (movieId) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please authenticate yourself before removing bookmarks.");
      return;
    }

    try {
      const response = await fetch("https://entertanment-app.onrender.com/api/bookmark", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ bookmark_id: movieId }),
      });

      if (!response.ok) {
        throw new Error("Failed to remove bookmark");
      }

      // Dispatch an action to remove a bookmark from Redux state
      dispatch(removeBookmark(movieId));
      toast.success("Removed from Bookmark successfully!");
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  return (
    <div className="flex justify-center items-center mb-3 dark:bg-[#10141e] flex-col min-h-screen p-6">
      <h1 className="text-3xl dark:text-gray-300 font-thin mb-8 mr-auto ">
        Bookmarked Movies
      </h1>
      {bookmarkMovies.length === 0 ? (
        <p className="text-3xl dark:text-gray-300 font-semibold">No Bookmarks 😒</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 w-full">
          {bookmarkMovies.map((movie) => (
            <div
              key={movie.id} // Ensuring unique keys
              className="relative h-auto dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full rounded-t-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute top-2 right-2">
                <FaBookmark
                  className="dark:text-white cursor-pointer"
                  onClick={() => handleRemoveBookmark(movie.id)}
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-2">
                <h1 className="dark:text-white text-lg font-semibold truncate">
                  {movie.title}
                </h1>
                <p className="dark:text-gray-400 text-sm mt-1">
                  {new Date(movie.release_date).getFullYear()} •{" "}
                  {movie.vote_average} • {movie.adult ? "18+" : "PG"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default BookmarkPage;
