import React, { useEffect, useState } from "react";
import Book from "../../component/Book/Book";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Loader from "../../component/Loader/Loader";

const Books = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // Show 4 books per row
    slidesToScroll: 2,
    initialSlide: 0,
    rows: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Show 3 books per row for screens <= 1024px
          slidesToScroll: 2,
          infinite: true,
          dots: true,
          rows: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2, // Show 2 books per row for screens <= 600px
          slidesToScroll: 2,
          initialSlide: 2,
          rows: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Show 1 book per row for screens <= 480px
          slidesToScroll: 1,
          rows: 2,
        },
      },
    ],
  };

  const [books, setBooks] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await axios.get("http://localhost:8089/books");
        setBooks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  return (
    <>
      <div className="bg-zinc-900 px-4 h-auto px-12 py-8">
        <div>
          <h4 className="text-3xl text-yellow-100">All Books</h4>
          {!books && (
            <div className="flex items-center justify-center my-8">
              <Loader />
            </div>
          )}
          <div className="my-1 grid grid-cols-1 sm:grid-clos-3 md:grid-cols-4 gap-4">
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

export default Books;
