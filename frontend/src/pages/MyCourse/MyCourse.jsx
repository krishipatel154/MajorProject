import React, { useEffect, useState } from "react";
import axios from "axios";

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
      <h1>My Courses</h1>
      {courses.length > 0 ? (
        <ul>
          {courses.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      ) : (
        <p>No courses found.</p>
      )}
    </div>
  );
};

export default MyCourse;
