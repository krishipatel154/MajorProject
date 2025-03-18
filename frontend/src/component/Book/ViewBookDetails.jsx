import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../component/Loader/Loader";
import { Link, useParams } from "react-router-dom";
import { handleError, handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import { FaEdit, FaHeart, FaShoppingCart } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import ReedBook from "../ReedBook/ReedBook";
const ViewBookDetails = () => {
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const [bookDetails, setbookDetails] = useState([]);
  useEffect(() => {
    const getbookDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8089/books/get-book/${id}`
        );
        setbookDetails(response.data);
      } catch (error) {
        handleError(error);
      }
    };
    getbookDetails();
  }, []);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  const handleAddFavourite = async () => {
    const response = await axios.put(
      "http://localhost:8089/favourite/add-book-to-favourites",
      {},
      { headers }
    );
    handleSuccess(response.data.message);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:8089/books/delete-book",
        { headers }
      );
      handleSuccess(response.data);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      {bookDetails ? (
        <div className="gap-8 px-12 py-8 dark:bg-zinc-900 dark:text-white bg-white text-black flex lg:flex-row flex-col">
          <div className="lg:w-3/6 w-full">
            <div className="py-12 rounded flex lg:flex-row flex-col justify-around bg-back dark:bg-zinc-800">
              <img
                src={bookDetails.Image}
                className="lg:h-[70vh] w-[75%] md:h-[60vh] h-[50vh] rounded"
                alt="book"
              />
              {isLoggedIn === true && role === "user" && (
                <div className="flex lg:flex-col md:flex-row flex-col items-center justify-between lg:justify-start lg:mt-0 mt-8 ">
                  <button
                    className="bg-white text-red-500 rounded lg:rounded-full lg:text-3xl text-normal p-3"
                    onClick={handleAddFavourite}
                  >
                    <FaHeart />
                    <span className="ms-2 lg:hidden block text-normal">
                      Add to Favourite
                    </span>
                  </button>
                </div>
              )}
              {isLoggedIn === true && role === "admin" && (
                <div className="flex lg:flex-col flex-col md:flex-row items-center justify-between lg:justify-start lg:mt-0 mt-8 ">
                  <Link
                    to={`/update-book/${id}`}
                    className="text-white bg-blue-500 rounded lg:rounded-full lg:text-3xl text-normal p-2 flex items-center"
                  >
                    <FaEdit />
                    <span className="ms-2 lg:hidden block text-normal">
                      Edit Course
                    </span>
                  </Link>
                  <button
                    className="text-white bg-red-500 rounded lg:rounded-full lg:text-3xl text-normal p-2 lg:mt-4 mt-8 md:mt-0 flex items-center justify-center"
                    onClick={handleDelete}
                  >
                    <MdOutlineDelete />
                    <span className="ms-2 lg:hidden block text-normal">
                      Delete Course
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="p-4 lg:w-3/6 w-full">
            <h1 className="text-4xl font-semibold">{bookDetails.Name}</h1>
            <p className="mt-1 font-semibold underline text-2xl">
              {bookDetails.Author}
            </p>
            <p className="text-xl mt-4">{bookDetails.desc}</p>
            <div className="my-8">
              <ReedBook pdf={bookDetails.Pdf} />
            </div>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <div className="h-screen bg-zinc-900 flex items-center justify-center">
          <Loader />
        </div>
      )}
    </>
  );
};

export default ViewBookDetails;
