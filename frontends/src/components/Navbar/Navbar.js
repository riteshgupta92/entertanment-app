import React, { useEffect, useState } from "react";
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
      <nav className="flex justify-between items-center p-4 navbar">
        {/* right */}
        <div className="cursor-pointer">
          <BiSolidMovie
            size={50}
            style={{ color: "#fc4747" }}
            onClick={() => navigate("/")}
          />
        </div>

        {/* middle */}
        <ul className="flex gap-6 lg:gap-10 md:gap-8 sm:gap-4">
          <li>
            <NavLink to="/">
              <PiSquaresFourFill size={40} style={{ color: "#5a698f" }} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/movies">
              <TbMovie size={40} style={{ color: "#5a698f" }} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/tv-series">
              <PiTelevisionFill size={40} style={{ color: "#5a698f" }} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/bookmark">
              <FaBookmark size={40} style={{ color: "#5a698f" }} />
            </NavLink>
          </li>
        </ul>

        {/* left */}
        <div className="cursor-pointer">
          {isLoggedIn ? (
            <IoLogOutOutline
              size={50}
              style={{ color: "#5a698f" }}
              onClick={handleLogout}
            />
          ) : (
            <FaCircleUser
              size={50}
              style={{ color: "#5a698f" }}
              onClick={handleLogin}
            />
          )}
        </div>
      </nav>
      {!hideSearchBar && (
        <div className="flex my-3 px-3">
          <CiSearch className="text-[#fff] mr-2 sm:mr-4" size={30} />
          <input
            type="text"
            placeholder="Search for movies or TV series"
            className="w-full bg-transparent pb-2 sm:pb-4 outline-0 border-0 text-[#fff] text-lg sm:text-2xl placeholder:text-gray-700 focus:border-b-2 border-[#5a698f]"
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
