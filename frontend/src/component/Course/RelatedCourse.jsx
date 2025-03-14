import React, { useContext, useEffect, useState } from "react";
import Title from "../Title";
import Course from "./Course";
import axios, { all } from "axios";

const RelatedCourse = ({ category }) => {
  const [related, setRelated] = useState([]);
  const [allCourse, setAllCourse] = useState([]);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const allResponse = await axios.get("http://localhost:8089/course");
        setAllCourse(allResponse.data.data);
      } catch (error) {}
    };
    getCourse();
  }, []);

  if (allCourse.length > 0) {
    let productsCopy = allCourse.slice();
    console.log(productsCopy);
    productsCopy = productsCopy.filter((item) => category == item.category);
    // productsCopy = productsCopy.filter(
    //   (item) => subCategory == item.subCategory
    // );
    setRelated(productsCopy.slice(0, 5));
  }

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"Related"} text2={"Products"} />
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
