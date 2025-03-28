import React, { useState } from "react";
import { handleError, handleSuccess } from "../../utils";
import axios from "axios";
const AddCourse = () => {
  const [data, setData] = useState({
    image: "",
    name: "",
    faculty: "",
    price: "",
    desc: "",
    language: "",
    category: "",
    subCategory: "",
  });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        data.image === "" ||
        data.name === "" ||
        data.faculty === "" ||
        data.desc === "" ||
        data.price === "" ||
        data.language === "" ||
        data.category === "" ||
        data.subCategory === ""
      ) {
        handleError("All fields are required!!");
      } else {
        const response = await axios.post(
          "http://localhost:8089/course/add-course",
          data,
          {
            headers,
          }
        );
        setData({
          image: "",
          name: "",
          faculty: "",
          desc: "",
          language: "",
          price: "",
          category: "",
          subCategory: "",
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
        Add Course
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
            name="image"
            value={data.image}
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
            name="name"
            value={data.name}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-text dark:text-zinc-400">
            Faculty
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-[#03476F] dark:bg-zinc-900 text-text p-2 outline-none"
            placeholder="Faculty Name"
            required
            name="faculty"
            value={data.faculty}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="" className="text-text dark:text-zinc-400">
            Price
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-[#03476F] dark:bg-zinc-900 text-text p-2 outline-none"
            placeholder="Course price"
            required
            name="price"
            value={data.price}
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
            category
          </label>
          <textarea
            rows="5"
            className="w-full mt-2 bg-[#03476F] dark:bg-zinc-900 text-text p-2 outline-none"
            placeholder="Course category"
            required
            name="category"
            value={data.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="" className="text-text dark:text-zinc-400">
            subCategory
          </label>
          <textarea
            rows="5"
            className="w-full mt-2 bg-[#03476F] dark:bg-zinc-900 text-text p-2 outline-none"
            placeholder="Course category"
            required
            name="subCategory"
            value={data.subCategory}
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
          className="mt-4 px-3 bg-[#03476F] dark:bg-zinc-900 text-text font-semibold py-2 rounded hover:bg-back transaction-all duration-300"
          onClick={handleSubmit}
        >
          Add Course
        </button>
      </div>
    </div>
  );
};

export default AddCourse;
