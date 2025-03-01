import Navbar from "./component/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Language from "./component/Language/Language";
import Courses from "./pages/Courses/Courses";
import Contact from "./pages/Contact/Contact";
import About from "./pages/About/About";
import OtpVarification from "./component/OtpVarification/OtpVarification";
import CodeEditor from "./component/CodeEditor/CodeEditor";
import Books from "./pages/Books/Books";
import Cart from "./pages/Cart/Cart";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";
import RequestForgetPass from "./component/RequestForgetPass/RequestForgetPass";
import ForgetPassword from "./component/RequestForgetPass/ForgetPassword";
import ViewCourseDetails from "./component/Course/ViewCourseDetails";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authAction } from "./store/auth";
import Profile from "./pages/Profile/Profile";
import OrderHistory from "./pages/Profile/OrderHistory";
import Settings from "./pages/Profile/Settings";
import ViewBookDetails from "./component/Book/ViewBookDetails";
import Favourites from "./pages/Profile/Favoutites/Favourites";
import FavouriteBooks from "./pages/Profile/Favoutites/FavouriteBooks";
import AllOrders from "./pages/Admin/AllOrders";
import AddBook from "./pages/Admin/AddBook";
import AddCourse from "./pages/Admin/AddCourse";
import UpdateCourse from "./pages/Admin/UpdateCourse";
import UpdateBook from "./pages/Admin/UpdateBook";
import Payment from "./pages/Cart/Payment";
import MyCourse from "./pages/MyCourse/MyCourse";

function App() {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.auth.role);
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authAction.login());
      dispatch(authAction.changeRole(localStorage.getItem("role")));
    }
  }, []);
  return (
    <>
      <div className="app dark:bg-black dark:text-white">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/courses" element={<Courses />} />
          <Route exact path="/books" element={<Books />} />
          <Route
            exact
            path="/view-course-details/:id"
            element={<ViewCourseDetails />}
          />
          <Route
            exact
            path="/view-book-details/:id"
            element={<ViewBookDetails />}
          />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/profile" element={<Profile />}>
            {role === "user" ? (
              <>
                <Route index element={<Favourites />} />
                <Route
                  path="/profile/orderHistory"
                  element={<OrderHistory />}
                />
                <Route path="/profile/settings" element={<Settings />} />
              </>
            ) : (
              <>
                <Route index element={<AllOrders />} />
                <Route path="/profile/add-book" element={<AddBook />} />
                <Route path="/profile/add-course" element={<AddCourse />} />
              </>
            )}
          </Route>
          <Route path="/update-course/:id" element={<UpdateCourse />} />
          <Route path="/update-book/:id" element={<UpdateBook />} />
          <Route exact path="/fav-books" element={<FavouriteBooks />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/forgetPass" element={<RequestForgetPass />} />
          <Route
            exact
            path="/reset-password/:token"
            element={<ForgetPassword />}
          />
          <Route exact path="/language/:langname" element={<Language />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/my-course" element={<MyCourse />} />
          <Route exact path="/verify" element={<OtpVarification />} />
          <Route exact path="/funcode" element={<CodeEditor />} />
          <Route
            exact
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
