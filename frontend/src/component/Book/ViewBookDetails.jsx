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
import RelatedBooks from "./RelatedBooks";

const ViewBookDetails = () => {
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const [bookDetails, setbookDetails] = useState([]);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const getbookDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8089/books/get-book/${id}`
        );
        setbookDetails(response.data);
        console.log(bookDetails);
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
        <div className=" w-full px-4 py-8 dark:bg-white">
          <div className="flex lg:flex-row flex-col gap-8">
            {/* Book Details Section */}
            <div className="lg:w-full w-full bg-white rounded-lg shadow-md p-6">
              <div className="flex lg:flex-row flex-col gap-8">
                <img
                  src={bookDetails.Image}
                  className="lg:h-[70vh] w-full lg:w-1/3 h-[50vh] rounded"
                  alt="book"
                />
                <div className="flex flex-col justify-between w-full lg:w-1/2">
                  <h1 className="text-4xl dark:text-black font-semibold mb-2">
                    {bookDetails.Name}
                  </h1>
                  <p className="font-semibold text-xl mb-4 dark:text-black">
                    by {bookDetails.Author}
                  </p>
                  <p className="text-lg mb-4 dark:text-black">{bookDetails.desc}</p>
                  <p className="text-3xl font-semibold mb-4 dark:text-black">
                    Price: ${bookDetails.Price}
                  </p>
                  <ReedBook pdf={bookDetails.Pdf} />
                  <div className="mt-auto">
                    {isLoggedIn && role === "user" && (
                      <button
                        className="bg-red-500 text-white rounded-full p-3 flex items-center justify-center w-full"
                        onClick={handleAddFavourite}
                      >
                        <FaHeart className="mr-2" />
                        Add to Favourites
                      </button>
                    )}
                    {isLoggedIn && role === "admin" && (
                      <div className="flex gap-4 mt-4">
                        <Link
                          to={`/update-book/${id}`}
                          className="bg-blue-500 text-white rounded-full p-3 flex-1 text-center"
                        >
                          <FaEdit className="mr-2 inline-block" />
                          Edit Book
                        </Link>
                        <button
                          className="bg-red-500 text-white rounded-full p-3 flex-1"
                          onClick={handleDelete}
                        >
                          <MdOutlineDelete className="mr-2 inline-block" />
                          Delete Book
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar for Related Books */}
          </div>
          <div className="lg:w-full w-full">
            <RelatedBooks
              category={bookDetails.category}
              subCategory={bookDetails.subCategory}
            />
          </div>
          {/* Tabs for Description and Reviews */}
          <div className="mt-12">
            <div className="flex border-b">
              <button
                className={`p-4 ${
                  activeTab === "description"
                    ? "border-b-2 border-indigo-500 text-indigo-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("description")}
              >
                Description
              </button>
              <button
                className={`p-4 ${
                  activeTab === "reviews"
                    ? "border-b-2 border-indigo-500 text-indigo-600"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                Reviews (122)
              </button>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md">
              {activeTab === "description" ? (
                <p className="text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius, neque a viverra consectetur, turpis nulla
                  gravida nunc, non tempus velit orci vel quam.
                </p>
              ) : (
                <p className="text-gray-700">
                  Reviews section will be here. Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                </p>
              )}
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
