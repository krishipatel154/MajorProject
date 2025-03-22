import React, { useEffect, useState } from "react";
import Title from "../Title";
import Course from "./Course";
import axios from "axios";

const RelatedCourse = ({ category }) => {
  const [related, setRelated] = useState([]);
  const [allCourse, setAllCourse] = useState([]);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const allResponse = await axios.get("http://localhost:8089/course");
        setAllCourse(allResponse.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    getCourse();
  }, []);

  useEffect(() => {
    if (allCourse.length > 0) {
      let courseCopy = allCourse.slice();
      console.log("Products copy:", courseCopy);
      courseCopy = courseCopy.filter((item) => {
        return category === item.category;
      });
      console.log(courseCopy);
      setRelated(courseCopy.slice(0, 5));
    }
  }, [category, allCourse]); // This effect will run when `category` or `allCourse` changes

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"Related Courses"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-col-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((course, i) => (
          <Course key={i} course={course} />
        ))}
      </div>
    </div>
  );
};

export default RelatedCourse;
