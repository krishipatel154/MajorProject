import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../component/Loader/Loader";
import { useParams } from "react-router-dom";
import { handleError } from "../../utils";
import { ToastContainer } from "react-toastify";

const ViewCourseDetails = () => {
  const { id } = useParams();
  console.log(id);
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
        <div className="gap-8 px-12 py-8 bg-zinc-900 text-white flex md:flex-row flex-col">
          <div className="bg-zinc-800 rounded p-4 lg:h-[88vh] h-[50vh] lg:w-3/6 w-full flex items-center justify-center">
            <img
              src={courseDetails.Image}
              className="lg:h-[70vh] h-[40vh] rounded"
              alt=""
            />
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
