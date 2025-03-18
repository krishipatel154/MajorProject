import axios from "axios";
import React, { useEffect, useState } from "react";
import Title from "../Title";
import Course from "./Course";
import Loader from "../Loader/Loader";
import { ToastContainer } from "react-toastify";

const PopularCourse = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [popularCourse, setPopularCourse] = useState([]);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const handleGetPopularCourse = async () => {
      const response = await axios.get(
        "http://localhost:8089/course",
        {},
        { headers }
      );
      setCourseData(response.data);
      const getPopularCourse = courseData.filter((course) => course.isPopular);
      console.log(getPopularCourse);

      setPopularCourse(getPopularCourse);
    };
    handleGetPopularCourse();
  }, []);

  return (
    <div>
      <div>
        <Title text1={"Popular "} text2={"Courses"} />
      </div>
      <div>
        {!popularCourse.length ? (
          <div className="flex items-center justify-center my-8">
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
