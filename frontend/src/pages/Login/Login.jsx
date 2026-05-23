import { useState } from "react";
import { handleError, handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [loginInfo, setLoginInfo] = useState({
    Email: "",
    Password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevState) => ({ ...prevState, [name]: value }));
  };
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const { Email, Password } = loginInfo;
    if (!Email || !Password) {
      return handleError("All fields are required!!");
    }
    try {
      setIsLoading(true);
      const url = "http://localhost:8089/user/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, Email, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/verify", { state: { Email, Password } });
        }, 1000);
      } else if (error) {
        const message = error?.details[0].message;
        handleError(message);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="min-h-screen flex text-white bg-gray-500 bg-no-repeat bg-cover relative items-center bg-[url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)]">
        {/* Left Section - Welcome Message */}
        <div className="lg:flex w-1/2 hidden">
          <div className="absolute bg-gradient-to-r from-back dark:from-black via-black to-transparent opacity-70 inset-0 z-0"></div>
          <div className="w-full px-24 z-10 flex flex-col justify-center">
            <h1 className="text-6xl font-bold text-left tracking-wide mb-4">
              Welcome Back
            </h1>
            <p className="text-2xl text-gray-200">
              Learn anything, anytime, from anywhere. Continue your learning journey with us.
            </p>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
                <span>Exclusive courses from expert instructors</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
                <span>Learn at your own pace</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-indigo-400 rounded-full"></div>
                <span>Access lifetime resources</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="lg:w-1/2 w-full flex items-center justify-center md:px-16 px-4 py-8">
          <div className="w-full max-w-md">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  Login
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Sign in to access your learning platform
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="label-base">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500" />
                    <input
                      onChange={handleChange}
                      className="input-base pl-12"
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      name="Email"
                      value={loginInfo.Email}
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="label-base">Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-3.5 text-gray-400 dark:text-gray-500" />
                    <input
                      onChange={handleChange}
                      className="input-base pl-12 pr-12"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      name="Password"
                      value={loginInfo.Password}
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-3.5 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400 transition"
                    >
                      {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Forgot Password Link */}
                <div className="text-right">
                  <Link
                    to="/forgetPass"
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 font-medium transition"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Logging in..." : "Login"}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                    New to our platform?
                  </span>
                </div>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-gray-700 dark:text-gray-300">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-700 dark:hover:text-indigo-300 transition"
                >
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Additional Info */}
            <div className="mt-6 text-center text-white text-sm">
              <p>Secure login with encrypted connection</p>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  );
};

export default Login;
