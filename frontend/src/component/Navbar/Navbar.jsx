import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGripLines, FaTimes, FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import lightLogo from "../../images/logo.png";
import darkLogo from "../../images/logoDark.png";
import Avatar from "react-avatar";

const Navbar = () => {
  const data = localStorage.getItem("uname");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const [logo, setLogo] = useState(lightLogo);
  const [heroImage, setHeroImage] = useState("https://t4.ftcdn.net/jpg/04/19/26/97/360_F_419269782_9LsP3TQndMVnZ2j3ZhTPhMjaqQpFAth9.jpg");
  const element = document.documentElement;
  
  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
      setHeroImage("https://img.freepik.com/free-photo/laptop-with-glowing-screen-table-dark-top-view-copy-space_169016-51607.jpg")
      setLogo(darkLogo);
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
      setHeroImage("https://img.freepik.com/free-vector/geometric-science-education-background-vector-gradient-blue-digital-remix_53876-125993.jpg")
      setLogo(lightLogo);
    }
  }, [theme]);

  const links = [
    { title: "Courses", link: "/courses" },
    { title: "My Course", link: "/my-course" },
    { title: "Books", link: "/books" },
    { title: "Material", link: "/material" },
    { title: "Cart", link: "/cart" },
    { title: "Fun Code", link: "/funcode" },
  ];

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const logout = useSelector((state) => state.auth.logout);
  const role = useSelector((state) => state.auth.role);

  if (isLoggedIn === false) {
    links.splice(3, 1);
  }
  if (role === "admin") {
    links.splice(1, 1);
    links.splice(3, 1);
  }

  const [mobileNav, setMobileNav] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("id");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("uname");
    dispatch(logout());
    navigate("/");
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

  return (
    <>
      <div
        className={`${
          location.pathname === "/"
            ? `relative bg-cover bg-center bg-no-repeat text-white overflow-visible`
            : "bg-back overflow-visible text-white"
        }`}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div
          className={`${
            sticky
              ? "shadow-xl z-50 bg-gradient-to-r from-back to-back dark:from-gray-900 dark:to-black sticky top-0 left-0 right-0 duration-300 transition-all"
              : "transition-none"
          }`}
        >
          {/* Main Navbar */}
          <nav className="relative px-4 md:px-8 py-4 flex items-center justify-between h-[80px] dark:bg-transparent">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="Logo" className="w-12 h-12 md:w-14 md:h-14 hover:opacity-80 transition" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-8">
              {links.map((item, i) => (
                <Link
                  to={item.link}
                  key={i}
                  className="text-white font-medium hover:text-indigo-300 transition-colors duration-300 relative group"
                >
                  {item.title}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
            </div>

            {/* Right Side - Auth & Theme */}
            <div className="flex items-center gap-4 md:gap-6">
              {/* Theme Toggle */}
              <button
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="p-2 rounded-lg hover:bg-white/10 dark:hover:bg-black/30 transition"
                title="Toggle theme"
              >
                {theme === "dark" ? (
                  <FaSun size={20} className="text-yellow-400" />
                ) : (
                  <FaMoon size={20} className="text-gray-700" />
                )}
              </button>

              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center gap-3">
                {isLoggedIn === false ? (
                  <>
                    <Link
                      to="/login"
                      className="px-4 py-2 rounded-lg border-2 border-white text-white hover:bg-white hover:text-back transition-all duration-300 font-semibold"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="btn-primary"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300"
                    >
                      Logout
                    </button>
                    {role === "user" || role === "admin" ? (
                      <Link to="/profile">
                        <Avatar name={data || "User"} size="40" round="8px" className="border-2 border-white" />
                      </Link>
                    ) : null}
                  </>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileNav(!mobileNav)}
                className="md:hidden text-white text-2xl hover:text-gray-300 transition"
              >
                {mobileNav ? <FaTimes size={24} /> : <FaGripLines size={24} />}
              </button>
            </div>
          </nav>

          {/* Mobile Navigation */}
          {mobileNav && (
            <div className="md:hidden absolute top-[80px] left-0 right-0 bg-gradient-to-b from-back dark:from-gray-900 to-back/95 dark:to-gray-950 z-40 shadow-lg animate-fadeInUp">
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                {links.map((item, i) => (
                  <Link
                    to={item.link}
                    key={i}
                    onClick={() => setMobileNav(false)}
                    className="text-white text-lg font-semibold hover:text-indigo-300 transition-colors w-full text-center py-3 border-b border-white/10"
                  >
                    {item.title}
                  </Link>
                ))}

                {/* Mobile Auth */}
                <div className="w-full border-t border-white/10 pt-4 mt-4 space-y-3">
                  {isLoggedIn === false ? (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setMobileNav(false)}
                        className="block text-center px-6 py-2 border-2 border-white text-white hover:bg-white hover:text-back transition-all rounded-lg font-semibold"
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        onClick={() => setMobileNav(false)}
                        className="block text-center px-6 py-2 btn-primary"
                      >
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          handleLogout();
                          setMobileNav(false);
                        }}
                        className="w-full px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition"
                      >
                        Logout
                      </button>
                      {(role === "user" || role === "admin") && (
                        <Link to="/profile" onClick={() => setMobileNav(false)} className="flex justify-center py-3">
                          <Avatar name={data || "User"} size="40" round="8px" />
                        </Link>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Hero Section - Only on Home */}
        {location.pathname === "/" && (
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-transparent"></div>
            <div className="relative py-32 px-4 md:px-8">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">
                  Improve Your Knowledge
                  <span className="block text-indigo-400 mt-2">with Us</span>
                </h1>

                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg leading-relaxed">
                  Learn from expert instructors, access lifetime resources, and grow your skills at your own pace.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/courses"
                    className="btn-primary inline-block text-center"
                  >
                    Explore Courses
                  </Link>
                  <Link
                    to="/books"
                    className="btn-secondary inline-block text-center bg-white text-back hover:bg-gray-100"
                  >
                    Read Books
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
