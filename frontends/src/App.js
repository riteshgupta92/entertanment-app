import "./App.css";
import { BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import { useState } from "react";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import HomePage from "./Pages/HomePage";
import MoviesPage from "./Pages/MoviesPage";
import TvSeriesPage from "./Pages/TvSeriesPage";
import BookmarkPage from "./Pages/BookmarkPage";
import Navbar from "./components/Navbar/Navbar";
import MoviesDetailsPage from "./Pages/MoviesDetailsPage";
import TvDetailsPage from "./Pages/TvDetailsPage";
import PrivateRoute from "./components/Navbar/PrivateRoute";
import NotFoundPage from "./Pages/NotFoundPage";
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

const location = useLocation() 
const hideNavbar = location.pathname === "/404" || location.pathname === "*"

  return (
    <div className="bg-[#10141e] h-screen w-full py-20">
      {!hideNavbar && <Navbar onSearch={handleSearch} />}
      <Routes>
        <Route path="/" element={<HomePage searchTerm={searchTerm} />} />
        <Route
          path="/movies"
          element={<MoviesPage searchTerm={searchTerm} />}
        />
        <Route path="/movies/:id" element={<MoviesDetailsPage />} />
        <Route
          path="/tv-series"
          element={<TvSeriesPage searchTerm={searchTerm} />}
        />
        <Route path="/tv-series/:id" element={<TvDetailsPage/>}/>
        <Route path="/bookmark" element={<PrivateRoute><BookmarkPage /></PrivateRoute>} />
        <Route path="/login" element={<PrivateRoute><LoginPage /></PrivateRoute>} />
        <Route path="/signup" element={<PrivateRoute><SignupPage /></PrivateRoute>} />
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

function MainApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default MainApp;
