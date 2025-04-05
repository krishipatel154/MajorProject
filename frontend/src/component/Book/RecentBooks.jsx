import React from "react";
import Book from "../../component/Book/Book";
import Loader from "../../component/Loader/Loader";
import ReedBook from "../ReedBook/ReedBook";
import Title from "../Title/Title";

const RecentBooks = ({ books }) => {
  return (
    <div className="bg-white px-4 h-auto">
      <Title text1={"Recent Books"} />
      {!books.length ? (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-clos-3 md:grid-cols-4 gap-4">
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

export default RecentBooks;
