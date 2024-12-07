import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar/Navbar";
import Html from "./pages/Html/Html";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./component/Login/Login";
import SignUp from "./component/SignUp/SignUp";
import Language from "./component/Language/Language";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Home />
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
      element:<><Navbar/><Language/></>
    }
  ]);
  return (
    <>
      <div className="app">
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
