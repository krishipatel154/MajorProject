import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { handleError, handleSuccess } from "../../utils";

const ForgetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const [passwordStrength, setPasswordStrength] = useState(""); // To display password strength
  const [passwordError, setPasswordError] = useState(""); // To show validation error

  const validatePassword = (password) => {
    const hasSpecialChar = /[@]/.test(password);
    const hasDigit = /\d/.test(password);

    if (!hasSpecialChar || !hasDigit) {
      setPasswordError('Password must contain "@" and a digit');
    } else {
      setPasswordError("");
    }

    // Set password strength based on length and other conditions
    if (password.length < 6) {
      setPasswordStrength("Weak");
    } else if (password.length >= 6 && hasSpecialChar && hasDigit) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Medium");
    }
  };

  const [signUpInfo, setSignUpInfo] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const getSignUpInfo = { ...signUpInfo };
    getSignUpInfo[name] = value;
    setSignUpInfo(getSignUpInfo);
    if (e.target.name === "newPassword") {
      validatePassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signUpInfo.newPassword !== signUpInfo.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const url = `http://localhost:8089/user/reset-password/${token}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword: signUpInfo.newPassword }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        handleSuccess("Password reset successfully!");
        navigate("/login");
      } else {
        handleError(data.message || "Failed to reset password");
      }
    } catch (error) {
      handleError("Failed to reset password. Try again!");
    }
  };

  return (
    <>
      <div className="p-8 lg:w-1/2 mx-auto">
        <div className="bg-gray-200 rounded-b-lg py-12 text-center px-4 lg:px-24">
          <h1 className="text-xl">Reset Password</h1>

          <div className="relative mt-3">
            <input
              onChange={handleChange}
              className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md transition rounded-md w-full py-3 text-gray-600"
              id="newPassword"
              type={showPassword ? "text" : "password"} // Use showPassword here
              placeholder="New Password"
              name="newPassword"
              value={signUpInfo.newPassword}
              required
            />
            <div className="absolute left-0 inset-y-0 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 ml-3 text-gray-400 p-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
              </svg>
            </div>
            <div
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
              onClick={togglePasswordVisibility} // Add toggle functionality
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12S4 4 12 4s11 8 11 8-3 8-11 8-11-8-11-8z"></path>
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10 10 0 011.05 12M22.95 12a10 10 0 00-3.87-7.94M9.17 9.17a3 3 0 014.66 4.66M1 1l22 22"></path>
                </svg>
              )}
            </div>
          </div>

          {passwordError && (
            <p className="text-red-500 text-sm mt-1">{passwordError}</p>
          )}

          {signUpInfo.newPassword && (
            <p
              className={`text-sm mt-1 ${
                passwordStrength === "Strong"
                  ? "text-green-500"
                  : passwordStrength === "Weak"
                  ? "text-red-500"
                  : "text-yellow-500"
              }`}
            >
              Password Strength: {passwordStrength}
            </p>
          )}

          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="relative mt-3">
              <input
                onChange={handleChange}
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md transition rounded-md w-full py-3 text-gray-600"
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"} // Use showConfirmPassword here
                placeholder="Confirm Password"
                name="confirmPassword"
                value={signUpInfo.confirmPassword}
                required
              />

              <div className="absolute left-0 inset-y-0 flex items-center">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7 ml-3 text-gray-400 p-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                </svg>
              </div>
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12S4 4 12 4s11 8 11 8-3 8-11 8-11-8-11-8z"></path>
                    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10 10 0 011.05 12M22.95 12a10 10 0 00-3.87-7.94M9.17 9.17a3 3 0 014.66 4.66M1 1l22 22"></path>
                  </svg>
                )}
              </div>
            </div>

            <div className="flex items-center justify-center mt-8">
              <button className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow font-medium transition transform hover:-translate-y-0.5">
                Reset Password
              </button>
            </div>
          </form>
          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
