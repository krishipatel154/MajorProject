import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../component/Loader/Loader";
import Course from "./Course";
import { handleError } from "../../utils";
import { ToastContainer } from "react-toastify";

const AllCourse = () => {
  const [course, setCourse] = useState([]);
  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await axios.get("http://localhost:8089/course");
        setCourse(response.data);
      } catch (error) {
        handleError(error);
      }
    };
    getCourse();
  }, []);

  return (
    <>
      <div className="bg-white text-text px-4 h-auto px-12 py-8">
        <div>
          <h4 className="text-3xl text-zinc-800">All Courses</h4>
          {!course && (
            <div className="flex items-center justify-center my-8">
              <Loader />
            </div>
          )}
          <div className="my-1 grid grid-cols-1 sm:grid-clos-3 md:grid-cols-4 gap-4">
            {course &&
              course.map((course, i) => (
                <div key={i}>
                  <Course course={course} />
                </div>
              ))}
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default AllCourse;
