import React, { useEffect, useState } from "react";
import axios from "axios";
import Course from "../../component/Course/Course";
import CourseBanner from "../../component/CourseBanner/CourseBanner";
const Courses = () => {
  const [course, setCourse] = useState([]);
  useEffect(() => {
    const getCourse = async () => {
      try {
        const response = await axios.get("http://localhost:8001/course");
        console.log(response.data);
        setCourse(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getCourse();
  }, []);

  return (
    <>
      {/* <CourseBanner /> */}
      {/* <div className="mt-2 w-full h-full"> */}
      <div className="w-[80%] grid grid-cols-1 md:grid-cols-4">
        {course.map((course) => (
          <Course course={course} key={course.id} />
        ))}
      </div>
      {/* </div */}
    </>
  );
};

export default Courses;
