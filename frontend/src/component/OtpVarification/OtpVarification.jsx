import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";

const OtpVarification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { Email } = location.state || {};
  const handleOtpVerification = async (e) => {
    e.preventDefault();
    if (!otp) {
      return handleError("All fields are required!!");
    }
    try {
      console.log(Email);
      const url = "http://localhost:8001/user/verify-otp";
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
      console.log(Email);
      const result = await response.json();
      console.log(result);
      const { success, message, jwtToken } = result;
      if (success) {
        console.log(success);
        console.log(jwtToken);
        // localStorage.setItem("token", jwtToken);
        // localStorage.setItem("uname", FirstName);
        handleSuccess(message);
        navigate("/");
      } else if (error) {
        const message = error?.details[0].message;
        handleError(message);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-xs md:max-w-md w-full">
      <h2 className="text-xl md:text-2xl font-bold text-center text-gray-800 mb-6">
        Verify Your OTP
      </h2>
      <p className="text-center text-gray-600 mb-4">
        Enter the 6-digit OTP sent to your email.
      </p>
      <form onSubmit={handleOtpVerification}>
        <div className="flex space-x-2 justify-center mb-6">
          <OtpInput
            inputStyle={{ border: "1px solid black", borderRadius: "3px" }}
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
          className="w-full bg-purple-500 text-white py-2 md:py-3 rounded-lg font-semibold hover:bg-purple-600 transition duration-200"
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
  );
};

export default OtpVarification;
