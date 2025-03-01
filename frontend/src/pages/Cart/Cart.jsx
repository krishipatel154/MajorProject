import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../../utils";
import { ToastContainer } from "react-toastify";
import Loader from "../../component/Loader/Loader";
import { AiFillDelete } from "react-icons/ai";
const Cart = () => {
  const [cart, setCart] = useState();
  const [total, setTotal] = useState();
  const navigate = useNavigate();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8089/cart/get-course",
        { headers }
      );
      setCart(response.data.data);
    };
    fetch();
  }, []);

  const deleteItem = async (courseid) => {
    const response = await axios.put(
      `http://localhost:8089/cart/remove-from-cart/${courseid}`,
      {},
      { headers }
    );
    handleSuccess(response.data.message);
    setCart(cart.filter((item) => item._id !== courseid));
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      let total = 0;
      cart.map((item) => {
        total += item.Price;
      });
      setTotal(total);
      total = 0;
    }
  }, [cart]);

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8089/order/place-order",
        { order: cart },
        { headers }
      );
      handleSuccess(response.data.message);
      navigate("/payment", { state: { cart: cart } });
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-900 px-12 h-screen py-8 ">
      {!cart && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
      {cart && cart.length === 0 && (
        <div className="h-screen">
          <div className="h-[100%] flex items-center flex-col justify-center">
            <h1 className="text-2xl lg:text-3xl font-semibold text-zinc-400">
              No items available in cart
            </h1>
          </div>
        </div>
      )}
      {cart && cart.length > 0 && (
        <>
          <h1 className="text-5xl font-semibold text-zinc-500 mb-8">
            Your Cart
          </h1>
          {cart.map((item, i) => (
            <div
              className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-back dark:bg-zinc-800 justify-between items-center "
              key={i}
            >
              <img
                src={item.Image}
                className="w-[90px] h-[90px] border"
                alt="image"
              />
              <div className="w-full md:w-auto">
                <h2 className="text-2xl font-semibold text-text text-start mt-2 md:mt-0">
                  {item.Name}
                </h2>
                <p className="text-normal text-text mt-2 hidden md:block lg:hidden">
                  {item.desc}
                </p>
              </div>
              <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                <h3 className="text-text text-2xl font-semibold flex">
                  ${item.Price}
                </h3>
                <button
                  className="bg-text text-[#03476F] dark:text-zinc-900 border border-back rounded p-2 ms-12"
                  onClick={() => deleteItem(item._id)}
                >
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {cart && cart.length > 0 && (
        <div className="mt-4 w-full flex items-center justify-end">
          <div className="p-4 bg-back dark:bg-zinc-800 rounded">
            <h1 className="text-3xl text-text font-semibold">Total Amount</h1>
            <div className="mt-3 flex items-center justify-between text-xl text-text">
              <h2>{cart.length} courses</h2>
              <h2>$ {total}</h2>
            </div>
            <div className="mt-3 w-[100%]">
              <button
                className="bg-text rounded dark:text-black px-4 py-2 flex justify-center w-full font-semibold"
                onClick={handlePlaceOrder}
              >
                Place Your Order
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Cart;
