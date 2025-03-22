import axios from "axios";
import { Link } from "react-router-dom";
import { handleSuccess, handleError } from "../../utils";
import { ToastContainer } from "react-toastify";

const Course = ({ course, favourites, onRemoveCourse, isMyCourse }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    courseid: course._id,
  };

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
      handleSuccess("Live class started successfully!");
      window.location.href = `/live-class/${course._id}`;
    } catch (error) {
      handleError(
        error.response?.data?.message || "Failed to start live class"
      );
    }
  };

  const joinLiveClass = () => {
    window.location.href = `/live-class/${course._id}`;
  };

  return (
    <div className="text-black rounded shadow-lg bg-back flex flex-col h-full w-full p-4 transition-transform hover:scale-105">
      <Link
        to={{
          pathname: `/view-course-details/${course._id}`,
          state: { isMyCourse },
        }}
      >
        <div className="relative">
          <div className="bg-gray-100 rounded-t-lg overflow-hidden h-[200px] flex items-center justify-center">
            <img
              src={course.Image}
              alt="course"
              className="h-full object-contain"
            />
          </div>
          <div className="p-4">
            <h2 className="mt-2 text-xl font-bold text-gray-800">
              {course.Name}
            </h2>
            <p className="text-sm font-medium text-black mt-1">
              By: {course.Faculty}
            </p>
            <p className="mt-4 text-xl font-semibold text-red-500">
              ${course.Price}
            </p>
          </div>
        </div>
      </Link>

      {favourites && (
        <button
          className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
          onClick={handleRemoveCourse}
        >
          Remove From Favourites
        </button>
      )}

      {course.isLive && isMyCourse && (
        <Link
          to={`/live-stream/${course._id}`}
          className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-all"
        >
          Join Live Class
        </Link>
      )}

      <ToastContainer />
    </div>
  );
};

export default Course;
