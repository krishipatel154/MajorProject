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
          navigate("/verify", { state: { Email } });
        }, 1000);
      } else if (error) {
        const message = error?.details[0].message;
        handleError(message);
      } else {
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
                    <h1 className="text-3xl">Login Form</h1>
                  </div>
                  <form onSubmit={handleLogin}>
                    <div className="relative mb-6">
                      <input
                        onChange={handleChange}
                        className="appearance-none border pl-12 border-gray-200 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                        id="email"
                        type="text"
                        placeholder="Email"
                        name="Email"
                        value={loginInfo.Email}
                      />
                      <div className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-gray-400"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                    </div>
                    <div className="relative mb-6">
                      <input
                        onChange={handleChange}
                        className="appearance-none border pl-12 border-gray-200 shadow-sm focus:shadow-md focus:placeholder-gray-600 transition rounded-md w-full py-3 text-gray-600 leading-tight focus:outline-none focus:ring-gray-600 focus:shadow-outline"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        name="Password"
                        value={loginInfo.Password}
                      />
                      <div className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-7 w-7 text-gray-400"
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
                    <div className="flex items-center justify-center">
                      <button className="text-white py-2 px-4 uppercase rounded bg-indigo-500 hover:bg-indigo-600 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">
                        Login
                      </button>
                    </div>
                    <div className="mt-5 text-center">
                      <Link className="text-blue-500" to="/forgetPass">
                        Forget password?
                      </Link>
                    </div>
                    <div className="mt-5 text-center">
                      Don't have an account?{" "}
                      <Link className="text-blue-500" to="/signup">
                        Signup
                      </Link>
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

export default Login;
