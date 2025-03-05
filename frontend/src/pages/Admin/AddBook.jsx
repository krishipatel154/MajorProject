import React, { useState } from "react";
import { handleError, handleSuccess } from "../../utils";
import axios from "axios";
const AddBook = () => {
  const [data, setData] = useState({
    Image: "",
    Name: "",
    Author: "",
    desc: "",
    language: "",
    Category: "",
    Logo: "", // New field for logo
  });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setData({ ...data, Pdf: file }); // Add the selected file to the state
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        (data.Image === "" ||
          data.Name === "" ||
          data.Author === "" ||
          data.desc === "" ||
          data.language === "" ||
          data.Category === "" ||
          !data.Pdf, // Ensure a PDF file is selected
        data.Logo === "") // Ensure logo field is filled
      ) {
        handleError("All fields are required!!");
      } else {
        const formData = new FormData();
        formData.append("Image", data.Image);
        formData.append("Name", data.Name);
        formData.append("Author", data.Author);
        formData.append("desc", data.desc);
        formData.append("language", data.language);
        formData.append("Category", data.Category); // Update from "Category" to "Category"
        formData.append("file", data.Pdf);
        formData.append("Logo", data.Logo); // Append logo

        const response = await axios.post(
          "http://localhost:8089/books/add-book",
          formData,
          {
            headers: {
              ...headers,
              "Content-Type": "multipart/form-data", // Set the header to multipart/form-data
            },
          }
        );
        setData({
          Image: "",
          Name: "",
          Author: "",
          desc: "",
          language: "",
          Category: "",
          Pdf: null, // Clear the PDF file input
          Logo: "", // Reset logo field
        });
        handleSuccess(response.data.message);
      }
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-text dark:text-zinc-500 mb-8">
        Add Book
      </h1>
      <div className="p-4 bg-back dark:bg-zinc-800 rounded">
        <div>
          <label htmlFor="" className="text-text dark:text-zinc-400">
            Image
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-[#03476F] dark:bg-zinc-900 text-text p-2 outline-none"
            placeholder="Image URL"
            required
            name="Image"
            value={data.Image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="" className="text-text dark:text-zinc-400">
            Name
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-[#03476F] dark:bg-zinc-900 text-text p-2 outline-none"
            placeholder="Course Name"
            required
            name="Name"
            value={data.Name}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-text dark:text-zinc-400">
            Author
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-[#03476F] dark:bg-zinc-900 text-text p-2 outline-none"
            placeholder="Faculty Name"
            required
            name="Author"
            value={data.Author}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-text dark:text-zinc-400">
            Upload PDF
          </label>
          <input
            type="file"
            accept="application/pdf"
            className="w-full mt-2 bg-[#03476F] dark:bg-zinc-900 text-text p-2 outline-none"
            placeholder="Faculty Name"
            required
            name="Pdf"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <label htmlFor="" className="text-text dark:text-zinc-400">
            Logo URL
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-[#03476F] dark:bg-zinc-900 text-text p-2 outline-none"
            placeholder="Logo URL"
            required
            name="Logo"
            value={data.Logo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="" className="text-text dark:text-zinc-400">
            Language
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-[#03476F] dark:bg-zinc-900 text-text p-2 outline-none"
            placeholder="Course Language"
            required
            name="language"
            value={data.language}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="" className="text-text dark:text-zinc-400">
            Category
          </label>
          <textarea
            rows="5"
            className="w-full mt-2 bg-[#03476F] dark:bg-zinc-900 text-text p-2 outline-none"
            placeholder="Course Category"
            required
            name="Category"
            value={data.Category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="" className="text-text dark:text-zinc-400">
            Description
          </label>
          <textarea
            rows="5"
            className="w-full mt-2 bg-[#03476F] dark:bg-zinc-900 text-text p-2 outline-none"
            placeholder="Course description"
            required
            name="desc"
            value={data.desc}
            onChange={handleChange}
          />
        </div>
        <button
          className="mt-4 px-3  bg-[#03476F] dark:bg-zinc-900 text-text font-semibold py-2 rounded hover:bg-blue-600 transaction-all duration-300"
          onClick={handleSubmit}
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
