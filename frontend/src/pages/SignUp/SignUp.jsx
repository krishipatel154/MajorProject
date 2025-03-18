import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../../utils";
import privacyPolicy from "../../assets/PrivacyPolicy.pdf";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [signUpInfo, setSignUpInfo] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const getSignUpInfo = { ...signUpInfo };
    getSignUpInfo[name] = value;
    setSignUpInfo(getSignUpInfo);
    if (e.target.name === "Password") {
      validatePassword(value);
    }
  };

  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
    const { FirstName, LastName, Email, Password } = signUpInfo;
    if (!FirstName || !LastName || !Email || !Password) {
      return handleError("All fields are required!!");
    }
    try {
      const url = "http://localhost:8089/user/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpInfo),
      });
      const result = await response.json();
      const { success, error, message } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
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
      <body>
        <section class="min-h-screen flex text-white bg-gray-500 bg-no-repeat bg-cover relative items-center bg-[url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)]">
          <div class="lg:flex w-1/2 hidden ">
            <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
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
            {/* <div class="absolute lg:hidden z-10 inset-0">
            <div class="absolute bg-black opacity-60 inset-0 z-0"></div>
          </div> */}
            <div className="">
              <div className="p-8 mx-auto bg-zinc-900">
                <div className=" dark:bg-zinc-800 rounded py-12 px-4 lg:px-24">
                  <div className="flex justify-center items-center m-4">
                    <h1 className="text-3xl">Signup Form</h1>
                  </div>
                  <form className="mt-6" onSubmit={handleSignup}>
                    <div className="relative">
                      <input
                        onChange={handleChange}
                        className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                        id="fname"
                        type="text"
                        name="FirstName"
                        placeholder="First Name"
                        autoFocus
                        value={signUpInfo.FirstName}
                      />
                      <div className="absolute left-0 inset-y-0 flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 ml-3 text-gray-400 p-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                      </div>
                    </div>
                    <div className="relative mt-3">
                      <input
                        onChange={handleChange}
                        className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                        id="lname"
                        name="LastName"
                        type="text"
                        placeholder="Last Name"
                        value={signUpInfo.LastName}
                      />
                      <div className="absolute left-0 inset-y-0 flex items-center">
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 ml-3 text-gray-400 p-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                        </svg>
                      </div>
                    </div>
                    <div className="relative mt-3">
                      <input
                        onChange={handleChange}
                        className="appearance-none border pl-12 border-gray-100 shadow-sm focus:shadow-md focus:placeholder-gray-600  transition  rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                        id="email"
                        type="text"
                        placeholder="Email"
                        name="Email"
                        value={signUpInfo.Email}
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
                        value={signUpInfo.Password}
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
                    {passwordError && (
                      <p className="text-red-500 text-sm mt-1">
                        {passwordError}
                      </p>
                    )}

                    {signUpInfo.Password && (
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
                    <div className="mt-4 flex items-center text-gray-500">
                      <input
                        type="checkbox"
                        id="remember"
                        name="remember"
                        className="mr-2"
                        required
                      />{" "}
                      <label className="text-sm" htmlFor="remember">
                        I agree with the{" "}
                        <a
                          href={privacyPolicy}
                          className="text-indigo-400 hover:text-indigo-500"
                          target="_blank"
                        >
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                    <div className="flex items-center justify-center mt-8">
                      <button className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                        {" "}
                        Create Account
                      </button>
                    </div>
                    <div className="flex items-center justify-center mt-8">
                      <span>
                        Already have an account? <Link to="/login">Login</Link>{" "}
                      </span>
                    </div>
                  </form>
                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </section>
      </body>
    </>
  );
};

export default SignUp;
