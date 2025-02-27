import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../component/Loader/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { handleError, handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
const ViewCourseDetails = () => {
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const navigate = useNavigate();
  const [courseDetails, setCourseDetails] = useState([]);
  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8089/course/get-course/${id}`
        );
        setCourseDetails(response.data);
      } catch (error) {
        handleError(error);
      }
    };
    getCourseDetails();
  }, []);
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

  return (
    <>
      {courseDetails ? (
        <div className="gap-8 px-12 py-8 bg-white text-black dark:bg-zinc-900 dark:text-text flex lg:flex-row flex-col">
          <div className="lg:w-3/6 w-full">
            <div className="py-12 rounded flex lg:flex-row flex-col justify-around bg-back dark:bg-zinc-800">
              <img
                src={courseDetails.Image}
                className="lg:h-[70vh] w-[80%] md:h-[60vh] h-[50vh] rounded"
                alt="course"
              />
              {isLoggedIn === true && role === "user" && (
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
              {isLoggedIn === true && role === "admin" && (
                <div className="flex lg:flex-col flex-col md:flex-row items-center justify-between lg:justify-start lg:mt-0 mt-8 ">
                  <Link to={`/update-course/${id}`} className="text-white bg-blue-500 rounded lg:rounded-full lg:text-3xl text-normal p-2 flex items-center">
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
          <div className="p-4 lg:w-3/6 w-full">
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
          </div>
          <ToastContainer />
        </div>
      ) : (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewCourseDetails;
