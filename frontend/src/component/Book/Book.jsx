import AddToCart from "../AddToCart/AddToCart";
import { Link } from "react-router-dom";

const Book = ({ book }) => {
  return (
    <Link>
      <div className="bg-[#03506F] dark:bg-zinc-800 rounded p-4 flex flex-col h-full w-full">
        <div className="bg-white rounded flex items-center justify-center h-[200px]">
          <img src={book.Image} alt="book" className="h-full object-contain" />
        </div>
        <h2 className="mt-4 text-xl text-text font-semibold">{book.Name}</h2>
        <p className="mt-2 text-text font-semibold">{book.Author}</p>
        <p className="mt-2 text-text font-semibold text-xl">$ {book.Price}</p>
      </div>
    </Link>
  );
};

export default Book;
