import React, { useEffect, useState } from "react";
import {FaMoon, FaSun} from "react-icons/fa"
import { BiSolidMovie } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { PiSquaresFourFill } from "react-icons/pi";
import { TbMovie } from "react-icons/tb";
import { PiTelevisionFill } from "react-icons/pi";
import { FaCircleUser } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setBookmark } from "../../features/slices/bookmarkSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

const toggleMenu = () => {
  setIsMenuOpen((prev) => !prev);
};



  // Toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  // Load theme from local storage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("accessToken");

      setIsLoggedIn(!!token);
    };
    checkLoginStatus();
  }, [location]);

  const handleLogin = () => {
    setIsLoggedIn(false);
    navigate("/signup");
  };

  const handleLogout = async () => {
    try {
      // Optional: Notify the server about logout
      const token = localStorage.getItem("accessToken");

      if (token) {
        await fetch("https://entertanment-app.onrender.com/api/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
      }
      // Clear local storage and state
      localStorage.removeItem("accessToken");
      localStorage.removeItem("bookmarks");
      dispatch(setBookmark([])); // clear the bookmarks from redux store
      // Set login state to false
      toast.success("Logged Out successfully!");
      setIsLoggedIn(false);
      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const hideSearchBar =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/bookmark" ||
    location.pathname.includes("/movies/") ||
    location.pathname.includes("/tv-series/");

  return (
    <>
       <nav className="dark:bg-[#161d2f] bg-slate-200 flex justify-between items-center p-4 navbar relative">
      <div className="cursor-pointer" onClick={() => navigate("/")}>
        <BiSolidMovie size={50} style={{ color: "#fc4747" }} />
      </div>

      {/* Hamburger Menu Button */}
      <div className="lg:hidden flex items-center">
        <button onClick={toggleMenu}>
          {isMenuOpen ? (
            <PiSquaresFourFill size={40} style={{ color: "#5a698f" }} />
          ) : (
            <div className="flex flex-col justify-center items-center">
              <div className="h-1 w-8 bg-gray-700 mb-1"></div>
              <div className="h-1 w-8 bg-gray-700 mb-1"></div>
              <div className="h-1 w-8 bg-gray-700"></div>
            </div>
          )}
        </button>
      </div>

      {/* Menu Items */}
      <ul className={`absolute top-16 left-0 w-full bg-white dark:bg-[#161d2f] flex-col lg:flex lg:flex-row lg:items-center lg:static lg:bg-transparent transition-all duration-300 ease-in-out ${isMenuOpen ? 'flex' : 'hidden'} lg:flex`}>
        <li className="flex items-center">
          <NavLink to="/" className="flex items-center px-4 py-2 text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            <PiSquaresFourFill size={30} className="mr-2" />
            Home
          </NavLink>
        </li>
        <li className="flex items-center">
          <NavLink to="/movies" className="flex items-center px-4 py-2 text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            <TbMovie size={30} className="mr-2" />
            Movies
          </NavLink>
        </li>
        <li className="flex items-center">
          <NavLink to="/tv-series" className="flex items-center px-4 py-2 text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            <PiTelevisionFill size={30} className="mr-2" />
            TV Series
          </NavLink>
        </li>
        <li className="flex items-center">
          <NavLink to="/bookmark" className="flex items-center px-4 py-2 text-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
            <FaBookmark size={30} className="mr-2" />
            Bookmarks
          </NavLink>
        </li>
      </ul>

      <div className="flex items-center cursor-pointer">
        {/* Dark Mode Toggle Button */}
        <button onClick={toggleTheme} className="mr-4">
          {isDarkMode ? (
            <FaSun size={40} style={{ color: "#f5c518" }} />
          ) : (
            <FaMoon size={40} style={{ color: "#5a698f" }} />
          )}
        </button>

        {isLoggedIn ? (
          <IoLogOutOutline size={50} style={{ color: "#5a698f" }} onClick={handleLogout} />
        ) : (
          <FaCircleUser size={50} style={{ color: "#5a698f" }} onClick={handleLogin} />
        )}
      </div>
    </nav>

    {/* Search Bar */}
    {!hideSearchBar && (
      <div className="flex my-3 px-3">
        <CiSearch className="dark:text-[#fff] mr-2 sm:mr-4" size={30} />
        <input
          type="text"
          placeholder="Search for movies or TV series"
          className="w-full bg-transparent pb-2 sm:pb-4 outline-0 border-0 dark:text-[#fff] text-lg sm:text-2xl dark:placeholder:text-gray-700 focus:border-b-2 dark:border-[#5a698f]"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
    )}
    <ToastContainer />
    </>
  );
};

export default Navbar;
