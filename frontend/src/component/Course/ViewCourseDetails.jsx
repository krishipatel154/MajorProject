import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../component/Loader/Loader";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { handleError, handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import { FaEdit, FaHeart } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import { FaStarHalfAlt } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import RelatedCourse from "./RelatedCourse";
import { FaShoppingCart } from "react-icons/fa";

const ViewCourseDetails = () => {
  const location = useLocation();
  const { isMyCourse } = location.state || {};
  const [isMyCourseState, setIsMyCourseState] = useState(isMyCourse || false);
  console.log(isMyCourseState);

  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [reviews] = useState(122); // Sample reviews count
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8089/course/get-course/${id}`
        );
        setCourseDetails(response.data);
        setSelectedImage(response.data.Image);
      } catch (error) {
        handleError(error);
      }
    };
    getCourseDetails();
  }, [id]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    courseid: id,
  };

  const handleAddFavourite = async () => {
    const response = await axios.put(
      "http://localhost:8089/favourite/add-course-to-favourites",
      {},
      { headers }
    );
    handleSuccess(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(
      "http://localhost:8089/cart/add-course-to-cart",
      {},
      { headers }
    );
    handleSuccess(response.data.message);
  };

  const handleDelete = async () => {
    const response = await axios.delete(
      "http://localhost:8089/course/delete-course",
      { headers }
    );
    handleSuccess(response);
    navigate("/courses");
  };

  const handleToggleLiveStream = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8089/course/toggle-live/${id}`,
        {},
        { headers }
      );
      handleSuccess(response.data.message);
      setCourseDetails({
        ...courseDetails,
        isLive: !courseDetails.isLive,
      });
    } catch (error) {
      handleError(error);
    }
  };
  console.log("course: ", courseDetails);

  return (
    <>
      {courseDetails ? (
        <>
          <div className="gap-8 px-12 py-8 bg-white text-black dark:bg-white dark:text-text flex lg:flex-row flex-col">
            {/* Course Image */}
            <div className="lg:w-1/3 w-full">
              <img
                src={selectedImage}
                className="lg:h-[70vh] w-[80%] md:h-[60vh] h-[50vh] rounded"
                alt="course"
              />
            </div>
            {/* Course Info */}
            <div className="p-4 lg:w-3/6 w-full">
              <div>
                <h1 className="text-4xl text-black dark:text-black font-semibold">
                  {courseDetails.Name}
                </h1>
                <p className="text-black font-semibold text-2xl underline dark:text-black mt-1">
                  {courseDetails.Faculty}
                </p>
                <p className="text-black dark:text-black text-xl mt-4">
                  {courseDetails.desc}
                </p>
                <p className="mt-4 text-black dark:text-black text-3xl font-semibold">
                  Price: ${courseDetails.Price}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <GoStarFill className="text-yellow-400 border-black" />
                  <GoStarFill className="text-yellow-400" />
                  <GoStarFill className="text-yellow-400" />
                  <GoStarFill className="text-yellow-400" />
                  <FaStarHalfAlt className="text-yellow-400" />
                  <p className="pl-2">({reviews})</p>
                </div>
              </div>
              {isLoggedIn && role === "user" && (
                <div className="flex items-center justify-between lg:justify-start  mt-8 gap-4">
                  <button
                    className="bg-red-500 text-white rounded-full p-3 flex items-center justify-center w-full"
                    onClick={handleAddFavourite}
                  >
                    <FaHeart className="mr-2" />
                    Add to Favourites
                  </button>
                  <button
                    className="bg-blue-500 text-white rounded-full p-3 flex items-center justify-center w-full"
                    onClick={handleCart}
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              )}
              {isLoggedIn && role === "admin" && (
                <div className="flex gap-4 mt-4">
                  <Link
                    to={`/update-course/${id}`}
                    className="bg-blue-500 text-white rounded-full p-3 flex-1 text-center"
                  >
                    <FaEdit className="mr-2 inline-block" />
                    Edit Book
                  </Link>
                  <button
                    className="bg-red-500 text-white rounded-full p-3 flex-1"
                    onClick={handleDelete}
                  >
                    <MdOutlineDelete className="mr-2 inline-block" />
                    Delete Book
                  </button>
                </div>
              )}
              {/* Admin - Live Stream Controls */}
              {isLoggedIn && role === "admin" && (
                <>
                  <button
                    className={`text-black ${
                      courseDetails.isLive ? "bg-red-500" : "bg-green-500"
                    } rounded-full lg:text-xl font-semibold text-normal p-2 h-[50px] w-[20vw] lg:mt-4 mt-8 md:mt-0 flex items-center justify-center`}
                    onClick={handleToggleLiveStream}
                  >
                    {courseDetails.isLive
                      ? "End Live Stream"
                      : "Start Live Stream"}
                  </button>
                  {courseDetails.isLive && (
                    <Link
                      to={`/live-stream/${id}`}
                      className="text-black bg-back rounded-full  lg:text-xl font-semibold text-normal p-2 w-[20vw] h-[50px] lg:mt-4 mt-8 md:mt-0 flex items-center justify-center"
                    >
                      Join Stream Room
                    </Link>
                  )}
                </>
              )}

              {/* User - Join Live Class */}
              {isLoggedIn &&
                role === "user" &&
                isMyCourseState &&
                courseDetails.isLive && (
                  <Link
                    to={`/live-stream/${id}`}
                    className="text-white bg-blue-500 rounded text-normal p-2 mt-4 flex items-center justify-center"
                  >
                    Join Live Class
                  </Link>
                )}
            </div>
          </div>
          <RelatedCourse category={courseDetails.category} />

          {/* Tabs for Description and Reviews */}
          <div className="p-8 bg-white">
            <div className="flex border-b">
              <button
                className={`p-4 ${
                  activeTab === "description"
                    ? "border-b-2 border-indigo-500 text-indigo-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`p-4 ${
                  activeTab === "reviews"
                    ? "border-b-2 border-indigo-500 text-indigo-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews (122)
              </button>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              {activeTab === "description" ? (
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius, neque a viverra consectetur, turpis nulla
                  gravida nunc, non tempus velit orci vel quam.
                </p>
              ) : (
                <p className="text-gray-700">
                  Reviews section will be here. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                </p>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default ViewCourseDetails;
