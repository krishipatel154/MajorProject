import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../component/Loader/Loader";
import { useParams } from "react-router-dom";
import { handleError } from "../../utils";
import { ToastContainer } from "react-toastify";
import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
const ViewCourseDetails = () => {
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  console.log(isLoggedIn, role);
  const [courseDetails, setCourseDetails] = useState([]);
  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8089/course/get-course/${id}`
        );
        console.log(response);
        setCourseDetails(response.data);
      } catch (error) {
        handleError(error);
      }
    };
    getCourseDetails();
  }, []);

  return (
    <>
      {courseDetails ? (
        <div className="gap-8 px-12 py-8 bg-zinc-900 text-white flex lg:flex-row flex-col">
          <div className="lg:w-3/6 w-full">
            <div className="py-12 rounded flex lg:flex-row flex-col justify-around bg-zinc-800">
              <img
                src={courseDetails.Image}
                className="lg:h-[70vh] md:h-[60vh] h-[50vh] rounded"
                alt=""
              />
              {isLoggedIn === true && role === "user" && (
                <div className="flex lg:flex-col flex-row items-center justify-between lg:justify-start lg:mt-0 mt-8 ">
                  <button className="bg-white text-red-500 rounded lg:rounded-full lg:text-3xl text-normal p-3">
                    <FaHeart />{" "}
                  </button>
                  <button className="text-white bg-blue-500 rounded lg:rounded-full lg:text-3xl text-normal p-2 lg:mt-4 mt-0 flex items-center justify-center">
                    <FaShoppingCart />
                    <span className="ms-2 lg:hidden block text-normal">
                      Add to cart
                    </span>
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex lg:flex-col flex-row items-center justify-between lg:justify-start lg:mt-0 mt-8 ">
                  <button className="text-white bg-blue-500 rounded lg:rounded-full lg:text-3xl text-normal p-2 flex items-center">
                    <FaEdit />{" "}
                  </button>
                  <button className="text-white bg-red-500 rounded lg:rounded-full lg:text-3xl text-normal p-2 lg:mt-4 mt-0 flex items-center justify-center">
                    <MdOutlineDelete />
                    <span className="ms-2 lg:hidden block text-normal">
                      Add to cart
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 lg:w-3/6 w-full">
            <h1 className="text-4xl text-zinc-300 font-semibold">
              {courseDetails.Name}
            </h1>
            <p className="text-zinc-400 mt-1">{courseDetails.Faculty}</p>
            <p className="text-zinc-500 text-xl mt-4">{courseDetails.desc}</p>
            <p className="mt-4 text-zinc-100 text-3xl font-semibold">
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
