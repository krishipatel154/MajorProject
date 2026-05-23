import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../../utils";
import { ToastContainer } from "react-toastify";
import Loader from "../../component/Loader/Loader";
import { AiFillDelete } from "react-icons/ai";
import { FaShoppingCart, FaArrowRight } from "react-icons/fa";
import Title from "../../component/Title/Title";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-8 px-4 md:px-12">
      {cart === undefined && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}

      {cart && cart.length === 0 && (
        <div className="max-w-7xl mx-auto">
          <Title text1={"Your Cart"} />
          <div className="h-[60vh] flex items-center flex-col justify-center">
            <FaShoppingCart size={80} className="text-gray-300 dark:text-gray-600 mb-6" />
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white text-center">
              Your cart is empty
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg mt-3 text-center">
              Start adding courses to get started!
            </p>
            <button
              onClick={() => navigate("/courses")}
              className="btn-primary mt-8"
            >
              Browse Courses
            </button>
          </div>
        </div>
      )}

      {cart && cart.length > 0 && (
        <div className="max-w-7xl mx-auto">
          <Title text1={"Your Cart"} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, i) => (
                <div
                  key={i}
                  className="card-base bg-white dark:bg-gray-800 p-6 flex gap-6 items-start hover:shadow-lg transition-all"
                >
                  {/* Course Image */}
                  <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <img
                      src={item.Image}
                      className="w-full h-full object-cover"
                      alt={item.Name}
                    />
                  </div>

                  {/* Course Details */}
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                      {item.Name}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      By: {item.Faculty || "Unknown"}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                        ${item.Price}
                      </span>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteItem(item._id)}
                    className="flex-shrink-0 p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-all"
                    title="Remove from cart"
                  >
                    <AiFillDelete size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card-base bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-900 dark:to-gray-800 p-6 sticky top-20">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 pb-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Subtotal</span>
                    <span>${total}</span>
                  </div>
                  <div className="flex justify-between text-gray-700 dark:text-gray-300">
                    <span>Courses</span>
                    <span className="bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-200 px-3 py-1 rounded-full text-sm font-semibold">
                      {cart.length}
                    </span>
                  </div>
                </div>

                <div className="mt-6 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                      ${total}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  Place Order
                  <FaArrowRight size={16} />
                </button>

                <button
                  onClick={() => navigate("/courses")}
                  className="btn-secondary w-full mt-3"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Cart;
