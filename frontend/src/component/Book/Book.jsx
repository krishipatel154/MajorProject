import { Link } from "react-router-dom";
import axios from "axios";
import { handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";

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
    <div className="h-[90%]">
      <Link to={`/view-book-details/${book._id}`}>
        <div className="bg-[#03506F] dark:bg-zinc-800 rounded p-4 flex flex-col h-full w-full">
          <div className="bg-white rounded flex items-center justify-center h-[200px]">
            <img
              src={book.Image}
              alt="book"
              className="h-full object-contain"
            />
          </div>
          <h2 className="mt-4 text-xl text-text font-semibold">
            {book.Name.length > 40 ? `${book.Name.slice(0, 40)}...` : book.Name}
          </h2>
          <p className="mt-2 text-text font-semibold">{book.Author}</p>
          <p className="mt-2 text-text font-semibold text-xl">$ {book.Price}</p>
        </div>
      </Link>
      {favourites && (
        <button
          className="bg-text text-sm font-semibold px-4 py-2 rounded border border-gray text-black"
          onClick={handleRemoveBook}
        >
          Remove From Favourites
        </button>
      )}
      <ToastContainer />
    </div>
  );
};

export default Book;
