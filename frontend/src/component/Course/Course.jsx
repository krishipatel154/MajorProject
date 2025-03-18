import axios from "axios";
import { Link } from "react-router-dom";
import { handleSuccess, handleError } from "../../utils";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { useState } from "react";

const Course = ({ course, favourites, onRemoveCourse, isMyCourse }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    courseid: course._id,
  };

<<<<<<< HEAD
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const [isLiveClassActive, setIsLiveClassActive] = useState(false);

=======
>>>>>>> 873f969f2c38e5247f2bc56b07ba931db1e6f452
  const handleRemoveCourse = async () => {
    const response = await axios.put(
      "http://localhost:8089/favourite/delete-course-from-favourites",
      {},
      { headers }
    );
    handleSuccess(response.data.message);
    setTimeout(() => {
      onRemoveCourse(course._id);
    }, 3000);
  };

  const startLiveClass = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8089/course/start-live-class",
        { courseId: course._id },
        { headers }
      );
      setIsLiveClassActive(true);
      handleSuccess("Live class started successfully!");
      // Redirect to live class room
      window.location.href = `/live-class/${course._id}`;
    } catch (error) {
      console.error("Error starting live class:", error);
      handleError(error.response?.data?.message || "Failed to start live class");
    }
  };

  const joinLiveClass = () => {
    window.location.href = `/live-class/${course._id}`;
  };

  return (
    <div className="bg-[#03506F] dark:bg-zinc-800 rounded p-4 flex flex-col h-full w-full">
      {/* <Link to={`/view-course-details/${course._id}`}> */}
      <Link
        to={{
          pathname: `/view-course-details/${course._id}`,
          state: { isMyCourse }, // Pass the flag as state
        }}
      >
        <div className="">
          <div className="bg-white rounded flex items-center justify-center h-[200px]">
            <img
              src={course.Image}
              alt="course "
              className="h-full object-contain"
            />
          </div>
          <h2 className="mt-4 text-xl text-text font-semibold">
            {course.Name}
          </h2>
          <p className="mt-2 text-text font-semibold">{course.Faculty}</p>
          <p className="mt-2 text-text font-semibold text-xl">
            $ {course.Price}
          </p>
        </div>
      </Link>
      {favourites && (
        <button
          className="bg-text text-sm font-semibold px-4 py-2 rounded border border-gray text-black"
          onClick={handleRemoveCourse}
        >
          Remove From Favourites
        </button>
      )}
<<<<<<< HEAD
      {isLoggedIn && role === 'admin' && (
        <button
          className="bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded mt-2 hover:bg-green-600 transition-colors"
          onClick={startLiveClass}
        >
          Start Live Class
        </button>
      )}
      {isLoggedIn && role === 'user' && isLiveClassActive && (
        <button
          className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded mt-2 hover:bg-blue-600 transition-colors"
          onClick={joinLiveClass}
        >
          Join Live Class
        </button>
      )}
=======
      {course.isLive && isMyCourse && (
        <Link
          to={`/live-stream/${course._id}`}
          className="bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded mt-2"
        >
          Join Live Class
        </Link>
      )}
      {/* {isPaymentDone && (
         <button
           className="bg-text text-sm font-semibold px-4 py-2 rounded border border-gray text-black"
           onClick={handleRemoveCourse}
         >
           Join Meeting
         </button>
       )} */}
>>>>>>> 873f969f2c38e5247f2bc56b07ba931db1e6f452
      <ToastContainer />
    </div>
  );
};

export default Course;
