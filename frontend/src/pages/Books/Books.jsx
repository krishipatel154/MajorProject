import React, { useState, useEffect } from "react";
import AllBooks from "../../component/Book/AllBooks";
import RecentBooks from "../../component/Book/RecentBooks";
import axios from "axios";
import Book from "../../component/Book/Book";
import BookNav from "./BookNav";
import ReedBook from "../../component/ReedBook/ReedBook";
import Loader from "../../component/Loader/Loader";
import { useLocation } from "react-router-dom";

const Books = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [recentBooks, setRecentBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recentResponse = await axios.get(
          "http://localhost:8089/books/recent-books"
        );
        const allResponse = await axios.get("http://localhost:8089/books");
        setRecentBooks(recentResponse.data);
        setAllBooks(allResponse.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filterBooksByCategory = (books) => {
    if (selectedCategory === "All") {
      return books;
    }
    return books.filter((book) => book.Category === selectedCategory);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <BookNav onCategorySelect={handleCategorySelect} />
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="py-8">
          {selectedCategory === "All" ? (
            <>
              <RecentBooks books={filterBooksByCategory(recentBooks)} />
              <AllBooks books={filterBooksByCategory(allBooks)} />
            </>
          ) : (
            <div className="max-w-7xl mx-auto px-4">
              <h2 className="section-title mb-2">{selectedCategory}</h2>
              <p className="section-subtitle">
                Explore {selectedCategory} books from our collection
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fadeInUp">
                {filterBooksByCategory(allBooks).map((book, i) => (
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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Books;

