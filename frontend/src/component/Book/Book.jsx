import { Link } from "react-router-dom";
import axios from "axios";
import { handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import { FaHeart, FaBook, FaStar } from "react-icons/fa";

const Book = ({ book, favourites, onRemoveBook }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: book._id,
  };
  const handleRemoveBook = async () => {
    const response = await axios.put(
      "http://localhost:8089/favourite/delete-book-from-favourites",
      {},
      { headers }
    );
    handleSuccess(response.data.message);
    setTimeout(() => {
      onRemoveBook(book._id);
    }, 3000);
  };
  
  return (
    <div className="group card-base bg-white dark:bg-gray-800 h-full flex flex-col overflow-hidden">
      <Link to={`/view-book-details/${book._id}`} className="flex-1 flex flex-col">
        <div className="relative flex-1">
          {/* Image Container */}
          <div className="h-[300px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-t-xl flex items-center justify-center">
            <img
              src={book.Image}
              alt={book.Name}
              className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            {/* Popular Badge */}
            {book.isPopular && (
              <div className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                <FaStar size={12} /> Bestseller
              </div>
            )}
          </div>

          {/* Content Container */}
          <div className="p-5 flex-1 flex flex-col">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {book.Name}
            </h2>
            
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 font-medium">
              ✍️ {book.Author}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-3">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} />
                ))}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">(4.8)</span>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 line-clamp-2 flex-1">
              {book.Description || "Read this amazing book to expand your knowledge"}
            </p>
          </div>
        </div>
      </Link>

      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        {favourites ? (
          <button
            className="btn-danger w-full flex items-center justify-center gap-2"
            onClick={handleRemoveBook}
          >
            <FaHeart size={16} />
            Remove From Favourites
          </button>
        ) : (
          <Link
            to={`/view-book-details/${book._id}`}
            className="btn-primary w-full flex items-center justify-center gap-2 text-center"
          >
            <FaBook size={16} />
            View Details
          </Link>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Book;
