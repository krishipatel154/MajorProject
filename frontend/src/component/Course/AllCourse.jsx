import React from "react";
import Loader from "../../component/Loader/Loader";
import Course from "./Course";
import { ToastContainer } from "react-toastify";
import Title from "../Title";

const AllCourse = ({ courses }) => {
  return (
    <>
      <div className="bg-white h-auto py-8">
        <div>
          <Title text1={"All Courses"} />
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

export default AllCourse;
