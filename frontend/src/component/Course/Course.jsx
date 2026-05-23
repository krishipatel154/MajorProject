import axios from "axios";
import { Link } from "react-router-dom";
import { handleSuccess, handleError } from "../../utils";
import { ToastContainer } from "react-toastify";
import { FaStar, FaHeart } from "react-icons/fa";

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

  return (
    <div className="group card-base card-hover bg-white dark:bg-gray-800 flex flex-col h-full w-full overflow-visible">
      <Link to={`/view-course-details/${course._id}`} state={{ isMyCourse }} className="flex-1">
        <div className="relative">
          {/* Image Container */}
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-t-xl overflow-hidden h-[220px] flex items-center justify-center relative">
            <img
              src={course.Image}
              alt={course.Name}
              className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            {/* Overlay Badge */}
            <div className="absolute top-3 right-3 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
              {course.isPopular ? "Popular" : "Course"}
            </div>
          </div>

          {/* Content Container */}
          <div className="p-5">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {course.Name}
            </h2>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium mt-2">
              👨‍🏫 {course.Faculty}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} />
                ))}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">(4.5)</span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-2">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                ${course.Price}
              </span>
            </div>
          </div>
        </div>
      </Link>

      {/* Action Button */}
      {favourites && (
        <button
          className="btn-danger mx-4 mb-4 flex items-center justify-center gap-2"
          onClick={handleRemoveCourse}
        >
          <FaHeart size={16} />
          Remove From Favourites
        </button>
      )}

      {!favourites && !isMyCourse && (
        <Link
          to={`/view-course-details/${course._id}`}
          className="mx-4 mb-4 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold py-2 px-4 rounded-lg text-center transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          View Details
        </Link>
      )}
      <ToastContainer />
    </div>
  );
};

export default Course;
