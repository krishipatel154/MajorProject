import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import lightLogo from "../../images/logo.png";
import darkLogo from "../../images/logoDark.png";
import Avatar from "react-avatar";
import { FaSearch, FaRegUser, FaOpencart } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const Navbar = () => {
  const data = localStorage.getItem("uname");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const [logo, setLogo] = useState(lightLogo);
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

  const links = [
    {
      title: "Courses",
      link: "/courses",
    },
    {
      title: "My Course",
      link: "/my-course",
    },
    {
      title: "Books",
      link: "/books",
    },
    {
      title: "Material",
      link: "/material",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Fun Code",
      link: "/funcode",
    },
  ];
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  if (isLoggedIn === false) {
    links.splice(3, 1);
  }
  const [mobileNav, setMobileNav] = useState("hidden");

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("uname");
    dispatch(logout());
    // const isLoggedIn = useSelector((state) => state.auth.logout);
  };

  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const location = useLocation();
  console.log(location.pathname);

  return (
    <>
      <div
        className={`${
          location.pathname === "/"
            ? "relative bg-[url(https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80)] bg-cover bg-center bg-no-repeat text-white"
            : "bg-back text-white"
        }`}
      >
        <div>
          <nav
            className={`relative px-8 py-4 flex items-center justify-between ease-in-out transition-shadow duration-300 h-[80px] dark:bg-black ${
              sticky
                ? "shadow-lg z-50 bg-black bg-[url()] text-white sticky top-0 left-0 right-0 duration-300 transition-all ease-in-out"
                : "transition-none"
            }`}
          >
            <div className="flex items-center">
              <Link to="/" className="md:ml-20 mt-0 pt-0">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-10 h-10 md:w-14 md:h-14"
                />
              </Link>
            </div>
            <div className="md:flex flex flex-row items-center justify-center gap-4">
              <div className="flex items-center">
                <label className="swap swap-rotate">
                  <input
                    type="checkbox"
                    className="theme-controller hidden"
                    checked={theme === "dark"}
                    onChange={() =>
                      setTheme(theme === "light" ? "dark" : "light")
                    }
                  />

                  {/* sun icon */}
                  <svg
                    className={`${
                      theme === "dark" ? "block" : "hidden"
                    } h-7 w-7 md:w-7 md:h-7 sm:w-3 sm:h-3 fill-current`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  {/* moon icon*/}
                  <svg
                    className={`${
                      theme === "light" ? "block" : "hidden"
                    } h-7 w-7 md:w-7 md:h-7 sm:w-3 sm:h-3 fill-current`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,3.05-.67A8.08,8.08,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </div>
              <div className="md:flex flex flex-row items-center justify-center gap-4">
                <div className="md:flex items-center hidden gap-8">
                  {links.map((item, i) => (
                    <Link
                      to={item.link}
                      key={i}
                      className="hover:text-zinc-300 transition-all duration-300"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="md:flex hidden gap-4">
                {isLoggedIn === false ? (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-1 dark:text-black dark:bg-white bg-text text-back hover:bg-text hover:text-back rounded transaction-all duration-300"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-4 py-1 bg-text text-back dark:text-black dark:bg-white hover:bg-text hover:text-back rounded transaction-all duration-300"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-1 dark:text-black dark:bg-text bg-text text-back flex items-center rounded hover:bg-gray-400 hover:text-zinc-800 transaction-all duration-300"
                      onClick={handleLogout}
                    >
                      Logout
                    </Link>
                  </>
                )}
                {isLoggedIn === true && role === "user" && (
                  <>
                    <Link to="/profile">
                      <Avatar name={data ? data : "AA"} size="40" round="50%" />
                    </Link>
                  </>
                )}
                {isLoggedIn === true && role === "admin" && (
                  <>
                    <Link to="/profile">
                      <Avatar name={data ? data : "AA"} size="40" round="50%" />
                    </Link>
                  </>
                )}
              </div>
              <button
                className="md:hidden block text-text dark:text-white text-2xl hover:text-zinc-400"
                onClick={() =>
                  mobileNav === "hidden"
                    ? setMobileNav("block")
                    : setMobileNav("hidden")
                }
              >
                <FaGripLines />
              </button>
            </div>
          </nav>
          <div
            className={` ${mobileNav} bg-back dark:bg-black mt-10 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
          >
            {links.map((item, i) => (
              <Link
                to={item.link}
                key={i}
                className="hover:text-blue-500 transition-all duration-300 text-white text-3xl font-semibold mb-8"
                onClick={() =>
                  mobileNav === "hidden"
                    ? setMobileNav("block")
                    : setMobileNav("hidden")
                }
              >
                {item.title}
              </Link>
            ))}
            {isLoggedIn === false ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1 bg-text text-back dark:text-black dark:bg-white hover:bg-text hover:text-back rounded transaction-all duration-300 text-2xl"
                  onClick={() =>
                    mobileNav === "hidden"
                      ? setMobileNav("block")
                      : setMobileNav("hidden")
                  }
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1 bg-text text-back hover:bg-text hover:text-back dark:text-black dark:bg-white rounded transaction-all duration-300 text-2xl mt-4"
                  onClick={() =>
                    mobileNav === "hidden"
                      ? setMobileNav("block")
                      : setMobileNav("hidden")
                  }
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link
                  className="px-8 mb-8 dark:text-black dark:bg-white text-2xl text-white font-semibold py-2 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transaction-all duration-300"
                  onClick={() =>
                    mobileNav === "hidden"
                      ? setMobileNav("block")
                      : setMobileNav("hidden")
                  }
                >
                  Logout
                </Link>
              </>
            )}
          </div>
        </div>
        {location.pathname === "/" ? (
          <div className="">
            <div className=" inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

            <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
              <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
                <h1 className="text-3xl font-extrabold sm:text-5xl">
                  Let us find your
                  <strong className="block font-extrabold text-rose-700">
                    {" "}
                    Forever Home.{" "}
                  </strong>
                </h1>

                <p className="mt-4 max-w-lg sm:text-xl/relaxed">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Nesciunt illo tenetur fuga ducimus numquam ea!
                </p>

                <div className="mt-8 flex flex-wrap gap-4 text-center">
                  <a
                    href="#"
                    className="block w-full rounded-sm bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow-sm hover:bg-rose-700 focus:ring-3 focus:outline-hidden sm:w-auto"
                  >
                    Get Started
                  </a>

                  <a
                    href="#"
                    className="block w-full rounded-sm bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow-sm hover:text-rose-700 focus:ring-3 focus:outline-hidden sm:w-auto"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Navbar;
