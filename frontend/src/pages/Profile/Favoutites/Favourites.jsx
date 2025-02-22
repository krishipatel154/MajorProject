import React, { useEffect, useState } from "react";
import axios from "axios";
import Course from "../../../component/Course/Course";
const Favourites = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const [favouriteCourse, setFavouriteCourse] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8089/favourite/get-course",
        { headers }
      );
      setFavouriteCourse(response.data.data);
    };
    fetch();
  }, []);

  const handleCourseRemoval = (courseId) => {
    setFavouriteCourse((prevCourses) =>
      prevCourses.filter((course) => course._id !== courseId)
    );
  };
  return (
    <>
      {favouriteCourse.length == 0 && (
        <>
          <div className="text-3xl h-[100%] w-full flex items-center justify-center font-semibold text-black dark:text-white">
            No Favourite Course Available!!
          </div>
        </>
      )}
      <div className="grid grid-cols-4 gap-4 ">
        {favouriteCourse &&
          favouriteCourse.map((item, i) => (
            <div key={i}>
              <Course
                course={item}
                favourites={true}
                onRemoveCourse={handleCourseRemoval}
              />
            </div>
          ))}
      </div>
    </>
  );
};

export default Favourites;
