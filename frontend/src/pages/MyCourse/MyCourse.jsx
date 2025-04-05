import React, { useEffect, useState } from "react";
import axios from "axios";
import Course from "../../component/Course/Course";
import Title from "../../component/Title/Title";

const MyCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCourses = async () => {
    try {
      const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        id: localStorage.getItem("id"),
      };

      const response = await axios.get(
        "http://localhost:8089/course/get-my-course",
        {
          headers,
        }
      );
      setCourses(response.data.myCourse);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to load courses.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return <div>Loading courses...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="m-4">
      <Title text1={"My "} text2={"Course"} />
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {courses.map((course) => (
            <Course key={course._id} course={course} isMyCourse={true} />
          ))}
        </div>
      ) : (
        <p>No courses found.</p>
      )}
    </div>
  );
};

export default MyCourse;
