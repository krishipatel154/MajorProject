import React from "react";
import courseData from "../../../public/courses.json";
import Course from "../../component/Course/Course";
import CourseBanner from "../../component/CourseBanner/CourseBanner";
const Courses = () => {
  return (
    <>
      {/* <CourseBanner /> */}
      {/* <div className="mt-2 w-full h-full"> */}
      <div className="w-[80%] grid grid-cols-1 md:grid-cols-4">
        {courseData.map((course) => (
          <Course course={course} key={course.id} />
        ))}
      </div>
      {/* </div */}
    </>
  );
};

export default Courses;
