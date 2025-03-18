import axios from "axios";
import React, { useEffect, useState } from "react";
import Title from "../Title";
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
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    const handleGetPopularBooks = async () => {
      const response = await axios.get(
        "http://localhost:8089/books",
        {},
        { headers }
      );
      console.log(response.data);
      setBookData(response.data);

      const getPopularBooks = bookData.filter((book) => book.isPopular);
      console.log(getPopularBooks);

      setPopularBooks(getPopularBooks);
    };
    handleGetPopularBooks();
  }, []);

  return (
    <div>
      <div>
        <Title text1={"Popular "} text2={"Books"} />
      </div>
      <div>
        {!popularBooks.length ? (
          <div className="flex items-center justify-center my-8">
            <Loader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {popularBooks.map((book, i) => (
              <div key={i}>
                <Book book={book} />
                <ReedBook pdf={book.Pdf} />
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
