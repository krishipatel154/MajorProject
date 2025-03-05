import React, { useState, useEffect } from "react";
import AllBooks from "../../component/Book/AllBooks";
import RecentBooks from "../../component/Book/RecentBooks";
import axios from "axios";
import Book from "../../component/Book/Book";
import BookNav from "./BookNav"; // Correct import
import ReedBook from "../../component/ReedBook/ReedBook";

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
    return books.filter((book) => book.Category === selectedCategory); // Updated to filter by language
  };

  return (
    <>
      <BookNav onCategorySelect={handleCategorySelect} /> {/* Correct prop */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {selectedCategory === "All" ? (
            <>
              <RecentBooks books={filterBooksByCategory(recentBooks)} />
              <AllBooks books={filterBooksByCategory(allBooks)} />
            </>
          ) : (
            <div className="bg-white text-text h-auto px-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {filterBooksByCategory(allBooks).map((book, i) => (
                  <div
                    key={i}
                    className="bg-[#03506F] dark:bg-zinc-800 rounded p-4 flex flex-col h-full w-full"
                  >
                    <Book book={book} />
                    <ReedBook pdf={book.Pdf} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Books;
