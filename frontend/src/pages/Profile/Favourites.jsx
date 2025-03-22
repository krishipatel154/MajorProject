import React, { useEffect, useState } from "react";
import axios from "axios";
import Course from "../../component/Course/Course";
import Book from "../../component/Book/Book";
import Title from "../../component/Title";
import ReedBook from "../../component/ReedBook/ReedBook";
const Favourites = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const [favouriteCourse, setFavouriteCourse] = useState([]);
  const [favouriteBook, setFavouriteBook] = useState([]);
  useEffect(() => {
    const fetchCourse = async () => {
      const response = await axios.get(
        "http://localhost:8089/favourite/get-course",
        { headers }
      );
      setFavouriteCourse(response.data.data);
    };
    const fetchBook = async () => {
      const response = await axios.get(
        "http://localhost:8089/favourite/get-book",
        { headers }
      );
      setFavouriteBook(response.data.data);
    };

    fetchCourse();
    fetchBook();
  }, []);

  const handleCourseRemoval = (courseId) => {
    setFavouriteCourse((prevCourses) =>
      prevCourses.filter((course) => course._id !== courseId)
    );
  };
  const handleBookRemoval = (bookId) => {
    setFavouriteCourse((prevBook) =>
      prevBook.filter((book) => book._id !== bookId)
    );
  };
  return (
    <>
      <div>
        <Title text1={"Favourite Course"} />
        {favouriteCourse.length === 0 && (
          <>
            <div className="text-3xl h-[100%] w-full flex items-center justify-center font-semibold text-black dark:text-white">
              No Favourite Course Available!!
            </div>
          </>
        )}
        <div className="grid grid-cols-3 gap-4 ">
          {favouriteCourse &&
            favouriteCourse.map((item, i) => (
              <div key={i}>
                <Course
                  course={item}
                  favourites={true}
                  onRemoveCourse={handleCourseRemoval}
                />
              </div>
            ))}
        </div>
      </div>
      <div className="">
        <Title text1={"Favourite Books"} />
        {favouriteBook.length === 0 && (
          <>
            <div className="text-3xl h-[100%] w-full flex items-center justify-center font-semibold text-black dark:text-white">
              No Favourite Book Available!!
            </div>
          </>
        )}
        <div className="grid grid-cols-3 gap-4">
          {favouriteBook &&
            favouriteBook.map((book, i) => (
              <div
                key={i}
                className="bg-[#03506F] dark:bg-zinc-800 rounded p-4 flex flex-col h-full w-full"
              >
                <Book
                  book={book}
                  favourites={true}
                  onRemoveBook={handleBookRemoval}
                />
                <ReedBook pdf={book.Pdf} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Favourites;
