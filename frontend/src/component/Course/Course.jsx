import axios from "axios";
import { Link } from "react-router-dom";
import { handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";

const Course = ({ course, favourites, onRemoveCourse }) => {
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
    <div className="bg-[#03506F] dark:bg-zinc-800 rounded p-4 flex flex-col h-full w-full">
      <Link to={`/view-course-details/${course._id}`}>
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
           {/* {isPaymentDone && (
         <button
           className="bg-text text-sm font-semibold px-4 py-2 rounded border border-gray text-black"
           onClick={handleRemoveCourse}
         >
           Join Meeting
         </button>
       )} */}
      <ToastContainer />
    </div>
  );
};

export default Course;
