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
      <section class="min-h-screen flex text-white bg-gray-500 bg-no-repeat bg-cover relative items-center bg-[url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)]">
        <div class="lg:flex w-full hidden ">
          <div class="absolute bg-back dark:bg-black opacity-60 inset-0 z-0"></div>
          <div class="w-full px-24 z-10">
            <h1 class="text-5xl font-bold text-left tracking-wide">
              Keep it special
            </h1>
            <p class="text-3xl my-4">
              Capture your personal memory in unique way, anywhere.
            </p>
          </div>
          <div class="bottom-0 absolute p-4 text-center right-0 left-0 flex justify-center space-x-4"></div>
        </div>
        <div class="lg:w-full w-full flex items-center bg-transparent justify-center text-center md:px-16 px-0 z-0">
          <div className="p-8 lg:w-full mx-auto bg-back dark:bg-black text-white">
            <div className="bg-back dark:bg-black rounded-b-lg py-12 text-center px-4 lg:px-24">
              <h1 className="text-3xl font-semibold">Forgot Password</h1>
              <form className="mt-6" onSubmit={handleForgetPass}>
                <div className="relative mt-3">
                  <input
                    onChange={handleChange}
                    className="appearance-none border pl-12 shadow-sm focus:shadow-md transition rounded-md w-full py-3 text-black"
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
                      className="h-7 w-7 ml-3 text-gray-500 dark:text-black"
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
        </div>
      </section>
    </>
  );
};

export default RequestForgetPass;
