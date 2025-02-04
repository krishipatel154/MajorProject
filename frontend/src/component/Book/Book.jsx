import AddToCart from "../AddToCart/AddToCart";
import { Link } from "react-router-dom";

const Book = ({ book }) => {
  return (
    <Link>
      <div className="bg-zinc-800 rounded p-4 flex flex-col h-full w-full">
        <div className="bg-zinc-900 rounded flex items-center justify-center h-[200px]">
          <img src={book.url} alt="book" className="h-full object-contain" />
        </div>
        <h2 className="mt-4 text-xl text-white text-zinc-200 font-semibold">
          {book.Name}
        </h2>
        <p className="mt-2 text-zinc-400 font-semibold">{book.Author}</p>
        <p className="mt-2 text-zinc-200 font-semibold text-xl">
          $ {book.Price}
        </p>
      </div>
    </Link>
  );
};

export default Book;
