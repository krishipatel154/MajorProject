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
  const { Email } = location.state || {};
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
    <div className="flex justify-center items-center bg-white w-[100%] h-[80vh]">
      <div className="bg-gray-100 dark:bg-zinc-900 text-text shadow-lg rounded-lg p-8 max-w-xs md:max-w-md w-full">
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
            className="w-full py-2 md:py-3 rounded-lg font-semibold hover:bg-purple-600 transition duration-200 text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"
          >
            Verify OTP
          </button>
        </form>
        <p className="text-center text-gray-600 mt-6">
          Didn’t receive the code?{" "}
          <a href="#" className="text-purple-500 hover:underline">
            Resend OTP
          </a>
        </p>
        <ToastContainer />
      </div>
    </div>
  );
};

export default OtpVarification;
