import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../utils";

const RequestForgetPass = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleForgetPass = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8089/user/forgot-password";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email: email }),
      });

      const data = await response.json();

      if (response.ok) {
        handleSuccess("Password reset email sent successfully.");
        navigate("/login");
      } else {
        handleError(data.message);
      }
    } catch (error) {
      handleError("Failed to send reset email. Try again!");
    }
  };

  return (
    <>
      <div className="p-8 lg:w-1/2 mx-auto bg-white text-text">
        <div className="bg-gray-200 dark:bg-black rounded-b-lg py-12 text-center px-4 lg:px-24">
          <h1 className="text-3xl font-semibold">Forgot Password</h1>
          <form className="mt-6" onSubmit={handleForgetPass}>
            <div className="relative mt-3">
              <input
                onChange={handleChange}
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md transition rounded-md w-full py-3 text-gray-600"
                id="email"
                type="email"
                placeholder="Email"
                name="Email"
                value={email}
                required
              />
              <div className="absolute left-0 inset-y-0 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 ml-3 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center justify-center mt-8">
              <button className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow font-medium transition transform hover:-translate-y-0.5">
                Send Reset Link
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default RequestForgetPass;
