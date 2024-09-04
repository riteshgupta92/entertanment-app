import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem("accessToken")); // Replace with your authentication logic
  const location = useLocation();
  console.log("worked",isAuthenticated);
  if (isAuthenticated) {
    // Redirect authenticated users away from login and signup pages
    if (location.pathname === "/login" || location.pathname === "/signup") {
      console.log("worked");
      return <Navigate to="/404" />;
    }
    return children;
  } else {
    // Redirect unauthenticated users to login
    if (location.pathname !== "/login" && location.pathname !== "/signup") {
      return <Navigate to="/login" />;
    }
    return children;
  }
};

export default PrivateRoute;
