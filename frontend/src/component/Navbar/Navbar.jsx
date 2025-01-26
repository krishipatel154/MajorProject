import React, { useEffect, useState } from "react";
import lightLogo from "../../images/logo.png";
import darkLogo from "../../images/logoDark.png";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const [logo, setLogo] = useState(lightLogo);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // Check for token

  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
      setLogo(darkLogo);
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
      setLogo(lightLogo);
    }
  }, [theme]);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token on logout
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page
  };
  const navItems = (
    <>
      <li className="hover:bg-text rounded-md">
        <Link
          to="/courses"
          className="text-text hover:bg-text hover:text-back dark:text-white"
        >
          Course
        </Link>
      </li>
      <li className="hover:bg-text rounded-md">
        <Link
          to="/books"
          className="text-text hover:bg-text hover:text-back dark:text-white"
        >
          Books
        </Link>
      </li>
      <li className="hover:bg-text rounded-md">
        <Link
          to="/contact"
          className="text-text hover:bg-text hover:text-back dark:text-white"
        >
          Contact
        </Link>
      </li>
      <li className="hover:bg-text rounded-md">
        <Link
          to="/about"
          className="text-text hover:bg-text hover:text-back dark:text-white"
        >
          About
        </Link>
      </li>
      {isLoggedIn ? (
        <>
          <li className="hover:bg-text rounded-md">
            <Link
              to="/profile"
              className="text-text hover:bg-text hover:text-back dark:text-white"
            >
              Profile
            </Link>
          </li>
          <li className="hover:bg-text rounded-md">
            <button
              onClick={handleLogout}
              className="text-text hover:bg-text hover:text-back dark:text-white"
            >
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className="hover:bg-text rounded-md">
            <Link
              to="/login"
              onClick={() => document.getElementById("my_modal_4").showModal()}
              className="text-text hover:bg-text hover:text-back dark:text-white"
            >
              Login
            </Link>
          </li>
          <li className="hover:bg-text rounded-md">
            <Link
              to="/signup"
              className="text-text hover:bg-text hover:text-back dark:text-white"
            >
              Sign Up
            </Link>
          </li>
        </>
      )}

      <li className="hover:bg-text rounded-md">
        <Link
          to="/funcode"
          className="text-text hover:bg-text hover:text-back dark:text-white"
        >
          Fun Code
        </Link>
      </li>
    </>
  );

  return (
    <>
      <div className="w-full mx-0 h-20 px-0 bg-[#03506F] dark:bg-black dark:text-white text-text">
        <div className="navbar w-full h-full flex p-0 justify-around align-items-center">
          <div className="navbar-start basis-[30%]">
            <div className="dropdown md:hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                {navItems}
              </ul>
            </div>
            <Link to="/" className="md:ml-20 mt-0 pt-0">
              <a className="btn btn-ghost text-xl w-24 h-20" href="#">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-10 h-10 md:w-14 md:h-14"
                />
              </a>
            </Link>
          </div>
          <div className="navbar-end space-x-3 m-2 basis-[70%]">
            <div className="navbar-center hidden m-0 lg:flex">
              <ul className="menu menu-horizontal gap-[10px] px-1">
                {navItems}
              </ul>
            </div>

            <label className="swap swap-rotate">
              {/* If theme is dark, swap-on should be visible (sun icon), else swap-off (moon icon) */}
              <input
                type="checkbox"
                className="theme-controller hidden"
                checked={theme === "dark"}
                onChange={() => setTheme(theme === "light" ? "dark" : "light")}
              />

              {/* sun icon */}
              <svg
                className={`${
                  theme === "light" ? "swap-off" : "hidden"
                } h-7 w-7 md:w-7 md:h-7 sm:w-3 sm:h-3 fill-current`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>

              {/* moon icon */}
              <svg
                className={`${
                  theme === "dark" ? "swap-on" : "hidden"
                } h-7 w-7 md:w-7 md:h-7 sm:w-3 sm:h-3 fill-current`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,3.05-.67A8.08,8.08,0,0,1,12.14,19.73Z" />
              </svg>
            </label>
            <div className="block w-full md:w-auto md:block">
              <label className="input input-bordered flex justify-center items-center gap-2">
                <input
                  type="text"
                  className="grow border-0 w-full"
                  placeholder="Search"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-5 w-5 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>
            </div>
          </div>
        </div>
      </div>
      <hr className="w-[100%] h-[2px] bg-back border-0 dark:bg-gray-700" />
    </>
  );
};

export default Navbar;
