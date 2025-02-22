import { useState } from "react";
import { handleError, handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [loginInfo, setLoginInfo] = useState({
    Email: "",
    Password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const getLoginInfo = { ...loginInfo };
    getLoginInfo[name] = value;
    setLoginInfo(getLoginInfo);
  };
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const { Email, Password } = loginInfo;
    if (!Email || !Password) {
      return handleError("All fields are required!!");
    }
    try {
      const url = "http://localhost:8089/user/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, FirstName, Email, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/verify", { state: { Email } });
        }, 1000);
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
    <>
      <div className="">
        <div className="p-8 lg:w-1/2 mx-auto">
          <div className="bg-gray-200 rounded-b-lg py-12 flex-column text-center justify-center align-items-center px-4 lg:px-24">
            <h1 className="">Login</h1>
            <form className="mt-6" onSubmit={handleLogin}>
              <div className="relative mt-3">
                <input
                  onChange={handleChange}
                  className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  id="email"
                  type="text"
                  placeholder="Email"
                  name="Email"
                  value={loginInfo.Email}
                />
                <div className="absolute left-0 inset-y-0 flex items-center">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 ml-3 text-gray-400 p-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
              </div>
              <div className="relative mt-3">
                <input
                  onChange={handleChange}
                  className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="Password"
                  value={loginInfo.Password}
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
                  onClick={togglePasswordVisibility}
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

              <div className="flex items-center justify-center mt-8">
                <button className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                  {" "}
                  Login
                </button>
              </div>
              <div className="mt-5">
                <span>
                  {" "}
                  <Link style={{ color: "blue" }} to="/forgetPass">
                    Forget password?
                  </Link>{" "}
                </span>
              </div>
              <div className="mt-5">
                <span>
                  Don't have an account?{" "}
                  <Link style={{ color: "blue" }} to="/signup">
                    Signup
                  </Link>{" "}
                </span>
              </div>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
