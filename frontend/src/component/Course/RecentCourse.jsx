import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../component/Loader/Loader";
import Course from "./Course";
import { handleError } from "../../utils";
import { ToastContainer } from "react-toastify";

const RecentCourse = () => {
  const [course, setCourse] = useState();
  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8089/course/recent-course"
        );
        setCourse(response.data);
      } catch (error) {
        handleError(error);
      }
    };
    getCourse();
  }, []);

  return (
    <>
      <div className="bg-white text-text h-auto px-4">
        <div>
          <h4 className="text-3xl text-zinc-800 py-4">
            Recently Added Courses
          </h4>
          {!course ? (
            <div className="flex items-center justify-center my-8">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-clos-3 md:grid-cols-4 gap-4">
              {course.map((course, i) => (
                <div key={i}>
                  <Course course={course} />
                </div>
              ))}
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default RecentCourse;
