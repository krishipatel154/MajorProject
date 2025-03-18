import React, { useEffect, useState } from "react";
import axios from "axios";
import Course from "../../component/Course/Course";
import { useSelector } from "react-redux";

const MyCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch courses from backend
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

  // Call fetchCourses on component mount
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
    <div>
      <h1 className="font-semibold text-3xl text-black dark:text-text m-8">My Courses</h1>
      {courses.length > 0 ? (
<<<<<<< HEAD
        <div className="grid grid-cols-1 sm:grid-clos-3 m-8 md:grid-cols-4 gap-4">
          {courses.map((course) => (
            <Course key={course._id} course={course} />
=======
        <div className="grid grid-cols-1 sm:grid-clos-3 md:grid-cols-4 gap-4">
          {courses.map((course) => (
            <Course course={course} isMyCourse={true} />
>>>>>>> 873f969f2c38e5247f2bc56b07ba931db1e6f452
          ))}
        </div>
      ) : (
        <p>No courses found.</p>
      )}
    </div>
  );
};

export default MyCourse;
