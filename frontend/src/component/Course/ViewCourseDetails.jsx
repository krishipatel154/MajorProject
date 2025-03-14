import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../component/Loader/Loader";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { handleError, handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import { FaEdit, FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import RelatedCourse from "./RelatedCourse";

const ViewCourseDetails = () => {
  const location = useLocation();
  const { isMyCourse } = location.state || {};

  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState({});
  const [selectedImage, setSelectedImage] = useState("");
  const [reviews] = useState(122); // Sample reviews count

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

  return (
    <>
      {courseDetails ? (
        <>
          <div className="gap-8 px-12 py-8 bg-white text-black dark:bg-zinc-900 dark:text-text flex lg:flex-row flex-col">
            {/* Course Image and Actions */}
            <div className="lg:w-3/6 w-full">
              <div className="py-12 rounded flex lg:flex-row flex-col justify-around bg-back dark:bg-zinc-800">
                <img
                  src={selectedImage}
                  className="lg:h-[70vh] w-[80%] md:h-[60vh] h-[50vh] rounded"
                  alt="course"
                />
                {isLoggedIn && role === "user" && (
                  <div className="flex lg:flex-col md:flex-row flex-col items-center justify-between lg:justify-start lg:mt-0 mt-8 ">
                    <button
                      className="bg-white text-red-500 rounded lg:rounded-full lg:text-3xl text-normal p-3"
                      onClick={handleAddFavourite}
                    >
                      <FaHeart />
                      <span className="ms-2 lg:hidden block text-normal">
                        Add to Favourite
                      </span>
                    </button>
                    <button
                      className="text-white bg-blue-500 md:mt-0 lg:mt-4 mt-4 rounded lg:rounded-full lg:text-3xl text-normal p-2 flex items-center justify-center"
                      onClick={handleCart}
                    >
                      <FaShoppingCart />
                      <span className="ms-2 lg:hidden block text-normal">
                        Add to cart
                      </span>
                    </button>
                  </div>
                )}
                {isLoggedIn && role === "admin" && (
                  <div className="flex lg:flex-col flex-col md:flex-row items-center justify-between lg:justify-start lg:mt-0 mt-8 ">
                    <Link
                      to={`/update-course/${id}`}
                      className="text-white bg-blue-500 rounded lg:rounded-full lg:text-3xl text-normal p-2 flex items-center"
                    >
                      <FaEdit />
                      <span className="ms-2 lg:hidden block text-normal">
                        Edit Course
                      </span>
                    </Link>
                    <button
                      className="text-white bg-red-500 rounded lg:rounded-full lg:text-3xl text-normal p-2 lg:mt-4 mt-8 md:mt-0 flex items-center justify-center"
                      onClick={handleDelete}
                    >
                      <MdOutlineDelete />
                      <span className="ms-2 lg:hidden block text-normal">
                        Delete Course
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            {/* Course Info */}
            <div className="p-4 lg:w-3/6 w-full">
              <div>
                <h1 className="text-4xl text-black dark:text-zinc-300 font-semibold">
                  {courseDetails.Name}
                </h1>
                <p className="text-black font-semibold text-2xl underline dark:text-zinc-300 mt-1">
                  {courseDetails.Faculty}
                </p>
                <p className="text-black dark:text-zinc-300 text-xl mt-4">
                  {courseDetails.desc}
                </p>
                <p className="mt-4 text-black dark:text-zinc-300 text-3xl font-semibold">
                  Price: ${courseDetails.Price}
                </p>
                <div className="flex items-center gap-1 mt-2">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <p className="pl-2">({reviews})</p>
                </div>
              </div>
              {/* Admin - Live Stream Controls */}
              {isLoggedIn && role === "admin" && (
                <>
                  <button
                    className={`text-zinc-900 ${
                      courseDetails.isLive ? "bg-red-500" : "bg-green-500"
                    } rounded lg:text-2xl font-bold text-normal p-2 h-[50px] w-[20vw] lg:mt-4 mt-8 md:mt-0 flex items-center justify-center`}
                    onClick={handleToggleLiveStream}
                  >
                    {courseDetails.isLive
                      ? "End Live Stream"
                      : "Start Live Stream"}
                  </button>
                  {courseDetails.isLive && (
                    <Link
                      to={`/live-stream/${id}`}
                      className="text-text bg-back rounded  lg:text-2xl text-normal p-2 w-[20vw] h-[50px] lg:mt-4 mt-8 md:mt-0 flex items-center justify-center"
                    >
                      Join Stream Room
                    </Link>
                  )}
                </>
              )}

              {/* User - Join Live Class */}
              {isLoggedIn && role === "user" && courseDetails.isLive && (
                <Link
                  to={`/live-stream/${id}`}
                  className="text-white bg-blue-500 rounded text-normal p-2 mt-4 flex items-center justify-center"
                >
                  Join Live Class
                </Link>
              )}
            </div>
          </div>

          {/* descripton and review */}
          <div className="mt-20">
            <div className="flex">
              <p className="font-bold border px-5 py-3 text-sm">Description</p>
              <p className="border px-5 py-3 text-sm">Reviews(122)</p>
            </div>
            <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
              <p className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur
                similique, amet laboriosam perferendis, nesciunt tempore sit
                voluptate impedit animi asperiores quos officia placeat. Odit
                obcaecati quia labore veniam vel et?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium totam illum aut consequatur, dolor minus deleniti
                consectetur suscipit aspernatur, eius voluptas quaerat facilis
                saepe omnis consequuntur tempore, ad perferendis similique?
              </p>
            </div>
          </div>
          <RelatedCourse category={courseDetails.category} />
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
