import React, { useState } from "react";
import { handleError, handleSuccess } from "../../utils";
import axios from "axios";
const AddMaterial = () => {
  const [data, setData] = useState({
    Name: "",
    Pdf: "",
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
      if (data.Name === "" || !data.Pdf) {
        handleError("All fields are required!!");
      } else {
        const formData = new FormData();
        formData.append("Name", data.Name);
        formData.append("file", data.Pdf);
        const response = await axios.post(
          "http://localhost:8089/material/add-material",
          formData,
          {
            headers: {
              ...headers,
              "Content-Type": "multipart/form-data", // Set the header to multipart/form-data
            },
          }
        );
        setData({
          Name: "",
          Pdf: null, // Clear the PDF file input
        });
        handleSuccess(response.data.message);
      }
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-black dark:text-zinc-500 mb-8">
        Add Material
      </h1>
      <div className="p-4 bg-back dark:bg-zinc-800 rounded">
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
        <button
          className="mt-4 px-3  bg-[#03476F] dark:bg-zinc-900 text-text font-semibold py-2 rounded hover:bg-blue-600 transaction-all duration-300"
          onClick={handleSubmit}
        >
          Add Material
        </button>
      </div>
    </div>
  );
};

export default AddMaterial;
