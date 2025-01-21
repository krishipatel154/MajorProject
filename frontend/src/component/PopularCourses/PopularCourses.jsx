import React from "react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Slider from "react-slick";
import courseData from "../../../public/courses.json";
import Course from "../Course/Course";

const PopularCourses = () => {
  const popularCourse = courseData.filter(
    (course) => course.catagory === "Popular"
  );
  return (
    <>
      {popularCourse.map((course) => (
        <Course course={course} key={course.id} />
      ))}
    </>
  );
};

export default PopularCourses;
