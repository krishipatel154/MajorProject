import React from "react";
import Book from "../../component/Book/Book";
import Loader from "../../component/Loader/Loader";
import ReedBook from "../ReedBook/ReedBook";

const AllBooks = ({ books }) => {
  return (
    <div className="bg-white text-text px-4 h-auto px-12 py-8">
      <h4 className="text-3xl text-zinc-800 py-4">All Books</h4>
      {!books.length ? (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : (
        <div className="my-1 grid grid-cols-1 sm:grid-clos-3 md:grid-cols-4 gap-4">
          {books.map((book, i) => (
            <div
              key={i}
              className="bg-[#03506F] dark:bg-zinc-800 rounded p-4 flex flex-col h-full w-full"
            >
              <Book book={book} />
              <ReedBook pdf={book.Pdf} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllBooks;
