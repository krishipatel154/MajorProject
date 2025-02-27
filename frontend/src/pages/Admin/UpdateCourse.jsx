import React, { useEffect, useState } from "react";
import { handleError, handleSuccess } from "../../utils";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const UpdateCourse = () => {
  const navigate = useNavigate();
  const {id} = useParams()
  const [data, setData] = useState({
    Image: "",
    Name: "",
    Faculty: "",
    Price: "",
    desc: "",
    Language: "",
    Catagory: "",
  });
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    courseid: id
  };
  
  useEffect(() => {
    const getCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8089/course/get-course/${id}`
        );
        setData(response.data);
      } catch (error) {
        handleError(error);
      }
    };
    getCourseDetails();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        data.Image === "" ||
        data.Name === "" ||
        data.Faculty === "" ||
        data.desc === "" ||
        data.Price === "" ||
        data.Language === "" ||
        data.Catagory === ""
      ) {
        handleError("All fields are required!!");
      } else {
        const response = await axios.put(
          "http://localhost:8089/course/update-course",
          data,
          {
            headers,
          }
        );
        setData({
          Image: "",
          Name: "",
          Faculty: "",
          desc: "",
          Language: "",
          Price: "",
          Catagory: "",
        });
        handleSuccess(response.data.message);
        navigate("/courses")
      }
    } catch (err) {
      handleError(err);
    }
  };
  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl fint-semibold text-zinc-500 mb-8">
        Update Course
      </h1>
      <div className="p-4 bg-zinc-800 rounded">
        <div>
          <label htmlFor="" className="text-zinc-400">
            Image
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Image URL"
            required
            name="Image"
            value={data.Image}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="" className="text-zinc-400">
            Name
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Course Name"
            required
            name="Name"
            value={data.Name}
            onChange={handleChange}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="" className="text-zinc-400">
            Faculty
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Faculty Name"
            required
            name="Faculty"
            value={data.Faculty}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="" className="text-zinc-400">
            Price
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Course price"
            required
            name="Price"
            value={data.Price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="" className="text-zinc-400">
            Language
          </label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Course Language"
            required
            name="Language"
            value={data.Language}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="" className="text-zinc-400">
            Catagory
          </label>
          <textarea
            rows="5"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Course catagory"
            required
            name="Catagory"
            value={data.Catagory}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="" className="text-zinc-400">
            Description
          </label>
          <textarea
            rows="5"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Course description"
            required
            name="desc"
            value={data.desc}
            onChange={handleChange}
          />
        </div>
        <button
          className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transaction-all duration-300"
          onClick={handleSubmit}
        >
          Edit Course
        </button>
      </div>
    </div>
  );
};

export default UpdateCourse;
