import React, { useState } from "react";
import { BiSolidMovie } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const registerAccount = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when signup starts
    // if password is matching from repeat password or not
    if (formData.password !== formData.repeatPassword) {
      toast.error("Passwords do not match!");
      return; // Stop the function from continuing if passwords don't match
    }
    try {
      const response = await fetch(
        "https://entertanment-app.onrender.com/api/signup",
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
        toast.success("Account created successfully!");

        setTimeout(() => {
          navigate("/");
        }, 2000);

        // reset form fields
        setFormData({
          email: "",
          password: "",
          repeatPassword: "",
        });
      } else {
        console.error(data.message);
        toast.error("User Already exits!");
      }
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };
  return (
    <div className="dark:bg-[#10141e] flex flex-col justify-center items-center w-full h-screen px-4 sm:px-6 lg:px-8">
      <BiSolidMovie
        size={50}
        style={{ color: "#fc4747", marginBottom: "10px" }}
      />
      <form
        className="dark:bg-[#161d2f] bg-slate-100 w-full max-w-[400px] flex flex-col rounded-lg"
        onSubmit={registerAccount}
      >
        <h2 className="dark:text-[#fff] text-3xl mt-8 mb-8 text-start mx-10 sm:mx-10">
          Sign Up
        </h2>
        <div className="w-full mb-8 flex justify-center items-center">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            className="w-full max-w-[320px] py-3 outline-0 border-0 bg-transparent border-b-2 dark:text-[#fff] px-2 sm:px-4"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="w-full mb-8 flex justify-center items-center">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full max-w-[320px] py-3 outline-0 border-0 bg-transparent border-b-2 dark:text-[#fff] px-2 sm:px-4"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="w-full mb-8 flex justify-center items-center">
          <input
            type="password"
            name="repeatPassword"
            placeholder="Repeat Password"
            className="w-full max-w-[320px] py-3 outline-0 border-0 bg-transparent border-b-2 dark:text-[#fff] px-2 sm:px-4"
            value={formData.repeatPassword}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-center items-center mb-8">
          <button
            className="dark:bg-[#fc4747] bg-blue-400 w-full max-w-[320px] py-3 rounded-md dark:text-[#fff] transition-colors duration-200"
            type="submit"
            disabled={loading} // Disable button while loading
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <div className="loader"></div>
                {/*Spinner*/}
                <span className="ml-2">Signing up...</span>
              </div>
            ) : (
              "Create an account"
            )}
          </button>
        </div>
        <div className="flex items-center justify-center gap-1 mb-8 flex-wrap">
          <p className="dark:text-[#fff]">Already have an account?</p>
          <span
            className="dark:text-[#fc4747] text-blue-400 cursor-pointer hover:underline"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignupPage;
