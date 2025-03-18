import React, { useEffect, useState } from "react";
import Loader from "../../component/Loader/Loader";
import { handleSuccess } from "../../utils";
// import { FaUserLarge } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import OrderHistory from "../Profile/OrderHistory";
import SeeUserData from "./SeeUserData";
const AllOrders = () => {
  const [allOrders, setAllOrders] = useState();
  const [options, setOptions] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const [userDiv, setUserDiv] = useState("hidden");
  const [userDivData, setUserDivData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8089/order/get-all-orders",
        { headers }
      );
      setAllOrders(response.data.data);
    };
    fetch();
  }, []);

  const handleSubmitChanges = async (i) => {
    const id = allOrders[i]._id;
    const response = await axios.put(
      `http://localhost:8089/order/update-status/${id}`,
      values,
      { headers }
    );
    handleSuccess(response.data.message);
    const updatedOrders = [...allOrders];
    updatedOrders[i].status = values.status;
    setAllOrders(updatedOrders);
    setOptions(-1);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  return (
    <>
      {!allOrders && (
        <div className="h-[100%] flex items-center justify-center ">
          <Loader />
        </div>
      )}
      {allOrders && allOrders.length > 0 && (
        <div className="h-[100%] dark:bg-zinc-800 bg-back p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl mb-8 font-semibold text-zinc-500">
            All Orders
          </h1>
          <div className="mt-4  w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr No.</h1>
            </div>
            <div className="w-[22%]">
              <h1 className="text-center">Courses</h1>
            </div>
            <div className="w-[45%]">
              <h1 className="text-center">Description</h1>
            </div>
            <div className="w-[9%]">
              <h1 className="text-center">Price</h1>
            </div>
            <div className="w-[16%]">
              <h1 className="text-center">Status</h1>
            </div>
            <div className="w-none md:w-[5%] hidden md:block">
              <h1 className="text-center">{/* <FaUserLarge /> */}</h1>
            </div>
          </div>
          {allOrders.map((items, i) => (
            <div className="dark:bg-zinc-800 bg-back w-full px-4 py-2 rounded flex gap-2 hover:bg-[#03476F] dark:hover:bg-zinc-900 hover:cursor-pointer transition-all duration-300">
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[40%] md:w-[22%]">
                <Link
                  to={`/view-course-details/${items.course._id}`}
                  className="hover:text-blue-300"
                >
                  {items.course.Name}
                </Link>
              </div>
              <div className="w-0 md:w-[45%] hidden md:block">
                <h1>{items.course.desc}</h1>
              </div>
              <div className="w-[17%] md:w-[9%]">
                <h1>$ {items.course.Price}</h1>
              </div>
              <div className="w-[30%] md:w-[16%]">
                <h1 className="font-semibold">
                  <button
                    className="hover:scale-105 transition-all duration-300"
                    onClick={() => setOptions(i)}
                  >
                    {items.status === "Order Placed" ? (
                      <div className="text-yellow-500">{items.status}</div>
                    ) : items.status === "Canceled" ? (
                      <div className="text-red-500">{items.status}</div>
                    ) : (
                      <div className="text-green-500">{items.status}</div>
                    )}
                  </button>
                  <div className={`${options === i ? "flex" : "hidden"}`}>
                    <select
                      name="status"
                      onChange={handleChange}
                      id=""
                      className="bg-grey-800 text-black"
                      value={values.status}
                    >
                      {[
                        "Order Placed",
                        "Out for delivery",
                        "Delivered",
                        "Canceled",
                      ].map((items, i) => (
                        <option value={items} key={i}>
                          {items}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => {
                        setOptions(-1);
                        handleSubmitChanges(i);
                      }}
                      className="text-green-500 hover:text-pink-600 mt-2"
                    >
                      Check
                    </button>
                  </div>
                </h1>
              </div>
              <div className="w-[10%] md:w-[5%]">
                <button
                  className="text-xl hover:text-orange-500"
                  onClick={() => {
                    setUserDiv("fixed");
                    setUserDivData(items.user);
                  }}
                >
                  user
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setUserDiv={setUserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
