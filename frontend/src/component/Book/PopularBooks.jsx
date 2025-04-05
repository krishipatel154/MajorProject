import axios from "axios";
import React, { useEffect, useState } from "react";
import Title from "../Title/Title";
import Loader from "../Loader/Loader";
import { ToastContainer } from "react-toastify";
import Book from "./Book";
import ReedBook from "../ReedBook/ReedBook";

const PopularBooks = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [popularBooks, setPopularBooks] = useState([]);

  useEffect(() => {
    const handleGetPopularBooks = async () => {
      try {
        const response = await axios.get("http://localhost:8089/books", {
          headers,
        });
        const getPopularBooks = response.data.filter((book) => book.isPopular);
        setPopularBooks(getPopularBooks);
      } catch (error) {
        console.error("Error fetching popular books:", error);
      }
    };
    handleGetPopularBooks();
  }, []);

  return (
    <div className="bg-white mb-8 h-auto">
      <Title text1={"Popular Books"} />
      {!popularBooks.length ? (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {popularBooks.map((book, i) => (
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
      <ToastContainer />
    </div>
  );
};

export default PopularBooks;
