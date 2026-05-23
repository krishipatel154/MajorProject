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
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 py-12 px-4 mb-8">
      <div className="max-w-7xl mx-auto">
        <Title text1={"Popular Books"} />
        
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Explore our curated collection of bestselling books to enhance your learning journey.
          </p>
        </div>

        {!popularBooks.length ? (
          <div className="flex items-center justify-center py-16">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeInUp">
            {popularBooks.map((book, i) => (
              <div
                key={i}
                className="animate-fadeInUp"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex flex-col h-full">
                  <Book book={book} />
                  <div className="mt-3">
                    <ReedBook pdf={book.Pdf} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default PopularBooks;

