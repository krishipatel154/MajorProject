import Navbar from "./component/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
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
import Favourites from "./pages/Profile/Favourites";
import AllOrders from "./pages/Admin/AllOrders";
import AddBook from "./pages/Admin/AddBook";
import AddCourse from "./pages/Admin/AddCourse";
import UpdateCourse from "./pages/Admin/UpdateCourse";
import UpdateBook from "./pages/Admin/UpdateBook";
import Payment from "./pages/Cart/Payment";
import MyCourse from "./pages/MyCourse/MyCourse";
import AddMaterial from "./pages/Admin/AddMaterial";
import Footer from "./component/Footer/Footer";
import LiveStream from "./component/LiveStream/LiveStream";
import Material from "./pages/Material/Material";

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
          {/* user routes */}
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgetPass" element={<RequestForgetPass />} />
          <Route
            exact
            path="/reset-password/:token"
            element={<ForgetPassword />}
          />
          <Route exact path="/verify" element={<OtpVarification />} />
          <Route exact path="/" element={<Home />} />

          {/* other routes */}
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/funcode" element={<CodeEditor />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/about" element={<About />} />

          {/* course route */}
          <Route exact path="/courses" element={<Courses />} />
          <Route
            exact
            path="/view-course-details/:id"
            element={<ViewCourseDetails />}
          />
          <Route exact path="/my-course" element={<MyCourse />} />
          <Route path="/update-course/:id" element={<UpdateCourse />} />
          <Route exact path="/material" element={<Material />} />

          {/* book routes */}
          <Route exact path="/books" element={<Books />} />
          <Route
            exact
            path="/view-book-details/:id"
            element={<ViewBookDetails />}
          />
          <Route path="/update-book/:id" element={<UpdateBook />} />

          {/* profile routes */}
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
                <Route path="/profile/add-material" element={<AddMaterial />} />
                <Route path="/profile/add-course" element={<AddCourse />} />
              </>
            )}
          </Route>

          {/* live class routes */}
          <Route
            path="/live-stream/:courseId"
            element={
              <PrivateRoute>
                <LiveStream />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
