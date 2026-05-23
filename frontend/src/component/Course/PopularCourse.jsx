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
    <div className="bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Title text1={"Popular Courses"} />
        
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Discover our most popular courses, handpicked for excellence and student satisfaction.
          </p>
        </div>

        {!popularCourse.length ? (
          <div className="flex items-center justify-center py-16">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeInUp">
            {popularCourse.map((course, i) => (
              <div key={i} className="animate-fadeInUp" style={{ animationDelay: `${i * 0.1}s` }}>
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
