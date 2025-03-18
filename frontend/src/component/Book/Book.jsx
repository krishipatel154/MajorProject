import { Link } from "react-router-dom";
import axios from "axios";
import { handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import { FaHeart, FaBook } from "react-icons/fa";

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
<<<<<<< HEAD
    <div className="h-[90%] bg-[#03506F]">
      <Link to={`/view-book-details/${book._id}`}>
        <div className="bg-[#03506F] dark:bg-zinc-800 rounded flex flex-col h-full w-full">
          <div className="bg-white rounded flex items-center justify-center h-[200px]">
            <img
              src={book.Image}
              alt="book"
              className="h-full object-contain"
            />
=======
    <div className="group relative bg-white dark:bg-gray-800 rounded-xl shadow-card hover:shadow-hover transition-all duration-300">
      <div className="h-[400px]">
        <Link to={`/view-book-details/${book._id}`}>
          <div>
            <div className="h-[280px] overflow-hidden bg-gray-100 dark:bg-gray-700 rounded-t-xl">
              <img
                src={book.Image}
                alt={book.Name}
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-display font-semibold text-gray-900 dark:text-white line-clamp-2">
                {book.Name}
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300 font-medium">
                by {book.Author}
              </p>
            </div>
>>>>>>> 873f969f2c38e5247f2bc56b07ba931db1e6f452
          </div>

          {favourites && (
            <button
              onClick={handleRemoveBook}
              className="mt-4 inline-flex items-center gap-2 text-red-500 hover:text-red-600"
            >
              <FaHeart />
              Remove from Favorites
            </button>
          )}
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Book;
