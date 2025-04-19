import React, { useEffect, useState } from "react";
import Title from "../Title/Title";
import Book from "./Book";
import axios from "axios";

const RelatedBooks = ({ category, subCategory }) => {
  const [related, setRelated] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const allResponse = await axios.get("http://localhost:8089/books");
        setAllBooks(allResponse.data);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
      }
    };
    getBooks();
  }, []);

  useEffect(() => {
    if (allBooks.length > 0) {
      let booksCopy = allBooks.slice();
      booksCopy = booksCopy.filter((item) => {
        return item.category?.toLowerCase() === category?.toLowerCase();
      });

      booksCopy = booksCopy.filter((item) => {
        return item.subCategory?.toLowerCase() === subCategory?.toLowerCase();
      });
      setRelated(booksCopy.slice(0, 5));
    }
  }, [category, subCategory, allBooks]);

  return (
    <div className="back:bg-white">
      <div className="text-center text-3xl py-2">
        <Title text1={"Related Books"} />
      </div>
      <div className="dark:bg-white grid grid-cols-2 sm:grid-cols-3 md:grid-col-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((book, i) => (
          <Book key={i} book={book} />
        ))}
      </div>
    </div>
  );
};

export default RelatedBooks;
