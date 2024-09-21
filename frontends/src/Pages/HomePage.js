import React, { useEffect, useState} from "react";
import {useNavigate} from "react-router-dom"
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addBookmark, removeBookmark } from "../features/slices/bookmarkSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = ({ searchTerm }) => {
  const [moviesData, setMoviesData] = useState([]);
  const [nowPlayingData, setNowPlayingData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate()
  const handleClick = (id)=>{
    navigate(`/movies/${id}`)
  }

   // Access bookmark state from Redux
 const bookmarkMovies = useSelector((state)=> state.bookmarks)
 const dispatch = useDispatch()
  useEffect(() => {
    const getMovieData = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=5feda587f1f255bcb4972ddf3e20720a`;
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data.results);
        setMoviesData(data.results);
      } catch (err) {
        console.log(err);
      }
    };
    const getTrendingData = async () => {
      try {
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=5feda587f1f255bcb4972ddf3e20720a`;
        const response = await fetch(url);
        const data = await response.json();
        setNowPlayingData(data.results);
      } catch (err) {
        console.log(err);
      }
    };

    getMovieData();
    getTrendingData();
  }, []);

  useEffect(() => {
    // filterd the movie based on the search Term
    if (searchTerm) {
      const filtered = moviesData.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilterData(filtered);
    } else {
      setFilterData(moviesData); // show all movies if no search term
    }
  }, [moviesData, searchTerm]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % nowPlayingData.length);
    }, 500);
    return () => clearInterval(interval);
  }, [nowPlayingData]);

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
      dispatch(addBookmark(movie)); // Dispatch Redux action
      toast.success("Added to Bookmark successfully!");
      console.log(movie);
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
      dispatch(removeBookmark(bookmark_id)); // Dispatch Redux action
      toast.success("Removed from Bookmark successfully!");
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  const isBookmarked = (id) => {
    return bookmarkMovies.some((movie) => movie.id === id);
  };
  return (
    <div className="flex justify-center items-center mb-3 bg-[#10141e] flex-col min-h-screen p-6">
      {/*Sliding Movies*/}
      <h1 className="text-3xl text-gray-300 font-thin mb-8 mr-auto ">
        Trending
      </h1>
      <div className="flex justify-center items-center gap-4 sm:gap-6 md:gap-8 mb-8 overflow-y-hidden overflow-x-scroll poster">
        {nowPlayingData.map((movie, index) => (
          <img
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className={`w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 object-contain max-h-[150px] sm:max-h-[180px] md:max-h-[200px] cursor-pointer rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105 ${
              currentIndex === index ? " opacity-100 scale-110" : "opacity-50"
            }`}
          />
        ))}
      </div>

      {/*Recommended*/}
      <h1 className="text-3xl text-gray-300 font-thin mb-8 mr-auto ">
        Recommended for you
      </h1>
      <div className="grid gap-10 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3 grid-cols-2">
        {filterData.map((movie) => (
          <div
            key={movie.id}
            className="relative bg-gray-800 rounded-lg overflow-hidden shadow-lg h-[200px]"
            onClick={()=>handleClick(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full max-w-60 h-full rounded-t-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
            />
            {/* Bookmark Icon */}
            <div className="absolute top-2 right-2">
              {isBookmarked(movie.id) ? (
                <FaBookmark
                  className="text-white cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveBookmark(movie.id);
                  }}
                />
              ) : (
                <FaRegBookmark
                  className="text-white cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddBookmark(movie);
                  }}
                />
              )}
            </div>
            {/* <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-2">
              <h1 className="text-white text-lg font-semibold truncate">
                {movie.title}
              </h1>
              <p className="text-gray-400 text-sm mt-1">
                {new Date(movie.release_date).getFullYear()} •{" "}
                {movie.vote_average} • {movie.adult ? "18+" : "PG"}
              </p>
            </div> */}
          </div>
        ))}
      </div>
      <ToastContainer/>
    </div>
  );
};

export default HomePage;
