import React, { useState } from "react";
import { BiSolidMovie } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const loginAccount = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when login starts

    try {
      const response = await fetch(
        "https://entertanment-app.onrender.com/api/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log(data);

        localStorage.setItem("accessToken", data.access_token);
        // Show toast notification
        toast.success("Login successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
        // reset form fields
        setFormData({
          email: "",
          password: "",
        });
      } else {
        // Show error notification if credentials do not match
        toast.error(data.message);
        console.error(data.message);
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };
  return (
    <div className="bg-[#10141e] flex flex-col justify-center items-center w-full h-screen px-4 sm:px-6 lg:px-8">
      <BiSolidMovie
        size={50}
        style={{ color: "#fc4747", marginBottom: "10px" }}
      />
      <form
        className="bg-[#161d2f] w-full max-w-[400px] flex flex-col rounded-lg"
        onSubmit={loginAccount}
      >
        <h2 className="text-[#fff] text-3xl mt-8 mb-8 text-start mx-10 sm:mx-10">
          Login
        </h2>
        <div className="w-full mb-8 flex justify-center items-center">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full max-w-[320px] py-3 outline-0 border-0 bg-transparent border-b-2 text-[#fff] px-2 sm:px-4"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="w-full mb-8 flex justify-center items-center">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full max-w-[320px] py-3 outline-0 border-0 bg-transparent border-b-2 text-[#fff] px-2 sm:px-4"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center items-center mb-8">
          <button
            className="bg-[#fc4747] w-full max-w-[320px] py-3 rounded-md text-[#fff] hover:bg-white hover:text-black transition-colors duration-200"
            type="submit"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="loader"></div>{/*Spinner*/}
                <span className="ml-2">Logging in...</span>
              </div>
            ) : (
              "Login to your account"
            )}
          </button>
        </div>
        <div className="flex items-center justify-center gap-1 mb-8 flex-wrap">
          <p className="text-[#fff]">Don't have an account?</p>
          <span
            className="text-[#fc4747] cursor-pointer hover:underline"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
