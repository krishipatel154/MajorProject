import React from "react";
import Loader from "../../component/Loader/Loader";
import Course from "./Course";
import { ToastContainer } from "react-toastify";

const RecentCourse = ({ courses }) => {
  return (
    <>
      <div className="bg-white text-text h-auto px-4">
        <div>
          <h4 className="text-3xl text-zinc-800 py-4">
            Recently Added Courses
          </h4>
          {!courses.length ? (
            <div className="flex items-center justify-center my-8">
              <Loader />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
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

export default RecentCourse;
