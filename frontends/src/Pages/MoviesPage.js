import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "../features/slices/movieSlice";
import { addBookmark, removeBookmark } from "../features/slices/bookmarkSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MoviesPage = ({ searchTerm }) => {
  const { movies, status, error, page, totalPages } = useSelector((state) => state.movies);
  const bookmarkMovies = useSelector((state) => state.bookmarks);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === "idle" || page !== currentPage) {
      dispatch(fetchMovies({ page: currentPage, limit: ITEMS_PER_PAGE }));
    }
  }, [dispatch, status, currentPage, page]);

  const filteredData = searchTerm
    ? movies.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : movies;

  const handleClick = (id) => {
    navigate(`/movies/${id}`);
  };

  const handleAddBookmark = async (movie) => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Please authenticate yourself before saving bookmarks.");
      return;
    }
    try {
      const response = await fetch("https://entertanment-app.onrender.com/api/bookmark", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(movie),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      dispatch(addBookmark(movie));
      toast.success("Added to Bookmark successfully!");
    } catch (error) {
      console.error("Error adding bookmark:", error);
    }
  };

  const handleRemoveBookmark = async (bookmark_id) => {
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
        body: JSON.stringify({ bookmark_id }),
      });
      if (!response.ok) {
        throw new Error("Failed to remove bookmark");
      }
      dispatch(removeBookmark(bookmark_id));
      toast.success("Removed from Bookmark successfully!");
    } catch (error) {
      console.error("Error removing bookmark:", error);
    }
  };

  const isBookmarked = (id) => {
    return bookmarkMovies.some((movie) => movie.id === id);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 rounded ${
              i === currentPage ? "bg-blue-500 text-white" : "bg-gray-700 text-white"
            }`}
          >
            {i}
          </button>
        );
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pageNumbers.push(
          <span key={`ellipsis-${i}`} className="text-white px-2">
            ...
          </span>
        );
      }
    }
    return pageNumbers;
  };

  if (status === "loading") return <p className="text-xl text-white px-4">Loading...</p>;
  if (status === "failed") return <p>{error}</p>;

  return (
    <div className="flex justify-center items-center mb-3 dark:bg-[#10141e] flex-col min-h-screen p-6">
      <h1 className="text-3xl dark:text-gray-300 font-thin mb-8 mr-auto ">Movies</h1>

      <div className="grid gap-10 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
        {filteredData.map((movie) => (
          <div
            key={movie.id}
            className="relative h-auto bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            onClick={() => handleClick(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-full rounded-t-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
            />

            {/* Bookmark Icon */}
            <div className="absolute top-2 right-2">
              {isBookmarked(movie.id) ? (
                <FaBookmark
                  className="dark:text-white cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveBookmark(movie.id);
                  }}
                />
              ) : (
                <FaRegBookmark
                  className="dark:text-white cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddBookmark(movie);
                  }}
                />
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-2">
              <h1 className="text-white text-lg font-semibold truncate">
                {movie.title}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {new Date(movie.release_date).getFullYear()} •{" "}
                {movie.vote_average} • {movie.adult ? "18+" : "PG"}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6 space-x-2">
        {currentPage > 1 && (
          <button
            className="bg-gray-700 text-white px-3 py-1 rounded"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages && (
          <button
            className="bg-gray-700 text-white px-3 py-1 rounded"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default MoviesPage;
