import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { handleError, handleSuccess } from "../../utils";

const ForgetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      console.log("New Password: ", newPassword);

      const url = `http://localhost:8089/user/reset-password/${token}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
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
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="relative mt-3">
              <input
                onChange={(e) => setNewPassword(e.target.value)}
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md transition rounded-md w-full py-3 text-gray-600"
                id="newPassword"
                type="password"
                placeholder="New Password"
                name="newPassword"
                value={newPassword}
                required
              />
            </div>

            <div className="relative mt-3">
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md transition rounded-md w-full py-3 text-gray-600"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                required
              />
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
