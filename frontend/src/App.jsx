import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./component/Login/Login";
import SignUp from "./component/SignUp/SignUp";
import Language from "./component/Language/Language";
import Courses from "./pages/Courses/Courses";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./pages/Home/Home.css";
import LanguagesNav from "./component/LanguagesNav/LanguagesNav";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import OtpVarification from "./component/OtpVarification/OtpVarification";
import CodeEditor from "./component/CodeEditor/CodeEditor";
import Books from "./pages/Books/Books";
import Cart from "./pages/Cart/Cart";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";
import RequestForgetPass from "./component/RequestForgetPass/RequestForgetPass";
import ForgetPassword from "./component/RequestForgetPass/ForgetPassword";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Home />
        </>
      ),
    },
    {
      path: "/courses",
      element: (
        <>
          <Navbar />
          <Courses />
        </>
      ),
    },
    {
      path: "/books",
      element: (
        <>
          <Navbar />
          <Books />
        </>
      ),
    },
    {
      path: "/contact",
      element: (
        <>
          <Navbar />
          <Contact />
        </>
      ),
    },
    {
      path: "/forgetPass",
      element: (
        <>
          <Navbar />
          <RequestForgetPass />
        </>
      ),
    },
    {
      path: "/reset-password/:token",
      element: (
        <>
          <Navbar />
          <ForgetPassword />
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <Navbar />
          <About />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
        <PrivateRoute>
          <Navbar />
          <Cart />
        </PrivateRoute>
      ),
    },
    {
      path: "/funcode",
      element: (
        <>
          <Navbar />
          <CodeEditor />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar />
          <Login />
        </>
      ),
    },
    {
      path: "/verify",
      element: (
        <>
          <Navbar />
          <OtpVarification />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar />
          <SignUp />
        </>
      ),
    },
    {
      path: "/language/:langname",
      element: (
        <>
          <Navbar />
          <LanguagesNav />
          <Language />
        </>
      ),
    },
  ]);
  return (
    <>
      <div className="app dark:bg-black dark:text-white">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
