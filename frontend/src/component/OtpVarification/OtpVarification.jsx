import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import { authAction } from "../../store/auth";
import { useDispatch } from "react-redux";

const OtpVarification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { Email, Password } = location.state || {};

  const handleResendOtp = async () => {
    if (!Email) {
      navigate("/login");
    }
    try {
      const url = "http://localhost:8089/user/resend-otp"; // Use the correct API endpoint for resending OTP
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Email }),
      });
      const result = await response.json();
      const { success, message } = result;
      if (success) {
        handleSuccess(message);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    if (!otp) {
      return handleError("All fields are required!!");
    }
    try {
      const url = "http://localhost:8089/user/verify-otp";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp,
          Email,
        }),
      });
      const result = await response.json();
      const { success, message, jwtToken, FirstName, id, role } = result;
      if (success) {
        dispatch(authAction.login());
        dispatch(authAction.changeRole(role));
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("uname", FirstName);
        localStorage.setItem("id", id);
        localStorage.setItem("role", role);
        handleSuccess(message);
        navigate("/profile");
      } else if (error) {
        const message = error?.details[0].message;
        handleError(message);
      } else if (!success) {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <section class="min-h-screen flex text-white bg-gray-500 bg-no-repeat bg-cover relative items-center bg-[url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)]">
      <div class="lg:flex w-1/2 hidden ">
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
      <div class="lg:w-1/2 w-full flex items-center bg-transparent justify-center text-center md:px-16 px-0 z-0">
        <div className="flex justify-center items-center bg-back dark:bg-black w-[100%] h-[80vh]">
          <div className="bg-back dark:bg-black text-text rounded-lg p-8 max-w-xs md:max-w-md w-full">
            <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
              Verify Your OTP
            </h2>
            <p className="text-center mb-4">
              Enter the 6-digit OTP sent to your email.
            </p>
            <form onSubmit={handleOtpVerification}>
              <div className="flex space-x-2 justify-center mb-6">
                <OtpInput
                  inputStyle={{
                    border: "1px solid black",
                    borderRadius: "3px",
                    color: "black",
                  }}
                  shouldAutoFocus
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  renderSeparator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 md:py-3 rounded-lg font-semibold  duration-200 text-white px-4 uppercase bg-indigo-500 hover:bg-indigo-600  transition transform "
              >
                Verify OTP
              </button>
            </form>
            <p className="text-center mt-6">
              Didn’t receive the code?{" "}
              <p
                onClick={handleResendOtp}
                className="text-purple-500 hover:underline"
              >
                Resend OTP
              </p>
            </p>
            <ToastContainer />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OtpVarification;
