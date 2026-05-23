import React, { useState, useEffect } from "react";
import RecentCourse from "../../component/Course/RecentCourse";
import AllCourse from "../../component/Course/AllCourse";
import Navbar from "./CourseNav";
import axios from "axios";
import { handleError } from "../../utils";
import Course from "../../component/Course/Course";
import Loader from "../../component/Loader/Loader";

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
    <div className="w-full bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <Navbar onLanguageSelect={handleLanguageSelect} />
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="py-8">
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
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="section-title mb-2">{selectedLanguage} Courses</h2>
                <p className="section-subtitle">
                  Explore {selectedLanguage} courses curated just for you
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeInUp">
                  {filterCoursesByLanguage(allCourses).map((course, i) => (
                    <div
                      key={i}
                      className="animate-fadeInUp"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <Course course={course} />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Courses;
