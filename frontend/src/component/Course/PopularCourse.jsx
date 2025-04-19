import axios from "axios";
import React, { useEffect, useState } from "react";
import Title from "../Title/Title";
import Course from "./Course";
import Loader from "../Loader/Loader";
import { ToastContainer } from "react-toastify";

const PopularCourse = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [popularCourse, setPopularCourse] = useState([]);

  useEffect(() => {
    const handleGetPopularCourse = async () => {
      try {
        const response = await axios.get("http://localhost:8089/course", {
          headers,
        });
        const getPopularCourse = response.data.filter(
          (course) => course.isPopular
        );
        setPopularCourse(getPopularCourse);
      } catch (error) {
        console.error("Error fetching popular courses:", error);
      }
    };
    handleGetPopularCourse();
  }, []);

  return (
    <div className="dark:bg-white">
      <div>
        <Title text1={"Popular Courses"} />
      </div>
      <div>
        {!popularCourse.length ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {popularCourse.map((course, i) => (
              <div key={i}>
                <Course course={course} />
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PopularCourse;
