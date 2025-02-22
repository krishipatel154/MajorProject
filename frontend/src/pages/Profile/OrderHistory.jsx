import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../component/Loader/Loader";
import { Link } from "react-router-dom";
const OrderHistory = () => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const [orderHistory, setOrderHistory] = useState();
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8089/order/get-order-history",
        { headers }
      );
      setOrderHistory(response.data.data);
    };
    fetch();
  }, []);
  return (
    <div>
      {!orderHistory && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
      {orderHistory && orderHistory.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center flex-col justify-center">
            <h1 className="text-2xl lg:text-3xl font-semibold text-zinc-400">
              No order history
            </h1>
          </div>
        </div>
      )}
      {orderHistory && orderHistory.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl mb-8 font-semibold text-zinc-500">
            Your Order History
          </h1>
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr No.</h1>
            </div>
            <div className="w-[22%]">
              <h1 className="text-center">Books</h1>
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
              <h1 className="text-center">Mode</h1>
            </div>
          </div>
          {orderHistory.map((item, i) => (
            <div
              className="w-full bg-zinc-800 rounded py-2 px-4 flex gap-4 hover:bg-zinc-900 hover:cursor-pointer"
              key={i}
            >
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[22%]">
                <Link
                  to={`/view-course-details/${item.course._id}`}
                  className="hover:text-blue-300"
                >
                  {item.course.Name}
                </Link>
              </div>
              {/* <div className="w-[45%]">
                <h1 className="text-center">
                  {item.book.desc.slice(0, 50)}...
                </h1>
              </div> */}
              <div className="w-[9%]">
                <h1 className="text-center">${item.course.Price} </h1>
              </div>
              <div className="w-[16%]">
                <h1 className="text-center">
                  {item.status === "Order Placed" ? (
                    <div className="text-yellow-500">{item.status}</div>
                  ) : item.status === "Canceled" ? (
                    <div className="text-red-500">{item.status}</div>
                  ) : (
                    item.status
                  )}
                </h1>
              </div>
              <div className="w-none md:w-[5%] hidden md:block">
                <h1 className="text-center">COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
