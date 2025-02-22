import React, { useEffect, useState } from "react";
import Book from "../../component/Book/Book";
import axios from "axios";
import Loader from "../../component/Loader/Loader";
const RecentBooks = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8089/books/recent-books"
        );
        setBooks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);
  return (
    <>
      <div className="bg-white text-text px-4 h-auto">
        <div>
          <h4 className="text-3xl text-zinc-800 py-4">Recently Added Books</h4>
          {!books && (
            <div className="flex items-center justify-center my-8">
              <Loader />
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-clos-3 md:grid-cols-4 gap-4">
            {books &&
              books.map((book, i) => (
                <div key={i}>
                  <Book book={book} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecentBooks;
