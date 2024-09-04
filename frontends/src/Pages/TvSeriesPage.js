import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { fetchTvSeries } from "../features/slices/tvSeriesSlice";
import { addBookmark, removeBookmark } from "../features/slices/bookmarkSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TvSeriesPage = ({ searchTerm }) => {
  const { tvSeries, status, error, page, totalPages } = useSelector(
    (state) => state.tvSeries
  );
  const bookmarkMovies = useSelector((state) => state.bookmarks);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle" || page !== currentPage) {
      dispatch(fetchTvSeries({ page: currentPage, limit: ITEMS_PER_PAGE }));
    }
  }, [dispatch, status, currentPage, page]);

  const filteredData = searchTerm
    ? tvSeries.filter((tv) =>
        tv.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : tvSeries;

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
      console.error("Error fetching bookmarks:", error);
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
        body: JSON.stringify({ bookmark_id: bookmark_id }),
      });
      if (!response.ok) {
        throw new Error("Failed to remove bookmark");
      }
      dispatch(removeBookmark(bookmark_id));
      toast.success("Removed from Bookmark successfully!");
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  const handleClick = (id) => {
    navigate(`/tv-series/${id}`);
  };

  const isBookmarked = (id) => {
    return bookmarkMovies.some((tv) => tv.id === id);
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
              i === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-white"
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

  if (status === "loading")
    return <p className="text-xl text-white px-4">Loading...</p>;
  if (status === "failed") return <p>{error}</p>;
  return (
    <div className="flex justify-center items-center mb-3 bg-[#10141e] flex-col min-h-screen p-6">
      <h1 className="text-3xl text-gray-300 font-thin mb-8 mr-auto">
        TV series
      </h1>

      <div className="grid gap-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-2">
        {filteredData.map((tv) => (
          <div
            key={tv.id}
            className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg h-[200px]"
            onClick={() => handleClick(tv.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${tv.poster_path}`}
              alt={tv.name}
              className="w-full h-auto rounded-t-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute top-2 right-2">
              {isBookmarked(tv.id) ? (
                <FaBookmark
                  className="text-white cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveBookmark(tv.id);
                  }}
                />
              ) : (
                <FaRegBookmark
                  className="text-white cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddBookmark(tv);
                  }}
                />
              )}
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-2">
              <h1 className="text-white text-lg font-semibold truncate">
                {tv.name}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {tv.vote_average} • {tv.adult ? "18+" : "PG"}
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

export default TvSeriesPage;
