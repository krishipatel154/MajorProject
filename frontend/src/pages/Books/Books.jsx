import React, { useEffect, useState } from "react";
import Book from "../../component/Book/Book";
// import books from "../../../public/courses.json";
import axios from "axios";
const Books = () => {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await axios.get("http://localhost:8001/books");
        console.log(response.data);
        setBook(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);
  return (
    <>
      <div className="w-[80%] grid grid-cols-1 md:grid-cols-4">
        {book.map((book) => (
          <Book book={book} key={book.id} />
        ))}
      </div>
    </>
  );
};

export default Books;
