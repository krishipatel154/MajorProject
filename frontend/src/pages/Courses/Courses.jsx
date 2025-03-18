import React, { useState, useEffect } from "react";
import RecentCourse from "../../component/Course/RecentCourse";
import AllCourse from "../../component/Course/AllCourse";
import Navbar from "./CourseNav";
import axios from "axios";
import { handleError } from "../../utils";
import Course from "../../component/Course/Course";

const Courses = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [allCourses, setAllCourses] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recentResponse = await axios.get(
          "http://localhost:8089/course/recent-course"
        );
        const allResponse = await axios.get("http://localhost:8089/course");
        setRecentCourses(recentResponse.data);
        setAllCourses(allResponse.data);
      } catch (error) {
        handleError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filterCoursesByLanguage = (courses) => {
    if (selectedLanguage === "All") {
      return courses;
    }
    return courses.filter((course) => course.category === selectedLanguage);
  };

  return (
    <>
      <Navbar onLanguageSelect={handleLanguageSelect} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {selectedLanguage === "All" && (
            <>
              {/* Show Recent Courses and All Courses headings if no language is selected */}
              <RecentCourse courses={filterCoursesByLanguage(recentCourses)} />
              <AllCourse courses={filterCoursesByLanguage(allCourses)} />
            </>
          )}
          {selectedLanguage !== "All" && (
            <>
              {/* Only show the courses filtered by selected language without headings */}
              <div className="bg-white text-text h-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filterCoursesByLanguage(allCourses).map((course, i) => (
                    <div key={i}>
                      <Course course={course} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Courses;
