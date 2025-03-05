import React from "react";
import Loader from "../../component/Loader/Loader";
import Course from "./Course";
import { ToastContainer } from "react-toastify";

const AllCourse = ({ courses }) => {
  return (
    <>
      <div className="bg-white text-text px-4 h-auto px-12 py-8">
        <div>
          <h4 className="text-3xl text-zinc-800 py-4">All Courses</h4>
          {!courses.length ? (
            <div className="flex items-center justify-center my-8">
              <Loader />
            </div>
          ) : (
            <div className="my-1 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {courses.map((course, i) => (
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

export default AllCourse;
