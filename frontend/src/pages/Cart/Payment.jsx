import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../../utils";
import { ToastContainer } from "react-toastify";
import { authAction } from "../../store/auth";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Payment = () => {
  const [isCard, setIsCard] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const handlePayment = async () => {
    try {
      const headers = {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const id = localStorage.getItem("id");
      const cartItems = location.state.cart;
      console.log("Done");
      const response = await axios.post(
        "http://localhost:8089/user/my-course",
        {
          cartItems, // Sending cartItems in the request body
          id,
        }
      );
      console.log(response);
      handleSuccess(
        "Payment Done Successfully!! Courses have been added to your profile."
      );
      dispatch(authAction.payment());

      navigate("/my-course");
    } catch (error) {
      handleError("Error processing payment.");
    }
  };

  return (
    <div>
      {/* Include Tailwind JIT CDN compiler */}
      <script src="https://unpkg.com/tailwindcss-jit-cdn"></script>

      {/* Payment Section */}
      <section className="antialiased bg-gray-100 text-gray-600 min-h-screen p-4">
        <div className="h-full">
          <div>
            <div className="relative px-4 sm:px-6 lg:px-8 max-w-lg mx-auto">
              <img
                className="rounded-t shadow-lg"
                src="https://preview.cruip.com/mosaic/images/pay-bg.jpg"
                width="460"
                height="180"
                alt="Pay background"
              />
            </div>
            <div className="relative px-4 sm:px-6 lg:px-8 pb-8 max-w-lg mx-auto">
              <div className="bg-white px-8 pb-6 rounded-b shadow-lg">
                {/* Card header */}
                <div className="text-center mb-6">
                  <div className="mb-2">
                    <img
                      className="-mt-8 inline-flex rounded-full"
                      src="https://preview.cruip.com/mosaic/images/user-64-13.jpg"
                      width="64"
                      height="64"
                      alt="User"
                    />
                  </div>
                  <h1 className="text-xl leading-snug text-gray-800 font-semibold mb-2">
                    Front-End Learning 🔥
                  </h1>
                  <div className="text-sm">
                    Learn how to create real web apps using HTML & CSS. Code
                    templates included.
                  </div>
                </div>

                {/* Toggle between Card and PayPal */}
                <div className="flex justify-center mb-6">
                  <div className="relative flex w-full p-1 bg-gray-50 rounded">
                    <span
                      className="absolute inset-0 m-1 pointer-events-none"
                      aria-hidden="true"
                    >
                      <span
                        className={`absolute inset-0 w-1/2 bg-white rounded border border-gray-200 shadow-sm transform transition duration-150 ease-in-out ${
                          isCard ? "translate-x-0" : "translate-x-full"
                        }`}
                      ></span>
                    </span>
                    <button
                      className="relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out focus:outline-none"
                      onClick={() => setIsCard(true)}
                    >
                      Pay With Card
                    </button>
                    <button
                      className="relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out focus:outline-none"
                      onClick={() => setIsCard(false)}
                    >
                      Pay With PayPal
                    </button>
                  </div>
                </div>

                {/* Card form */}
                {isCard && (
                  <div>
                    <div className="space-y-4">
                      {/* Card Number */}
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="card-nr"
                        >
                          Card Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="card-nr"
                          className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                          type="text"
                          placeholder="1234 1234 1234 1234"
                        />
                      </div>
                      {/* Expiry and CVC */}
                      <div className="flex space-x-4">
                        <div className="flex-1">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="card-expiry"
                          >
                            Expiry Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="card-expiry"
                            className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                            type="text"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div className="flex-1">
                          <label
                            className="block text-sm font-medium mb-1"
                            htmlFor="card-cvc"
                          >
                            CVC <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="card-cvc"
                            className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                            type="text"
                            placeholder="CVC"
                          />
                        </div>
                      </div>
                      {/* Name on Card */}
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="card-name"
                        >
                          Name on Card <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="card-name"
                          className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                          type="text"
                          placeholder="John Doe"
                        />
                      </div>
                      {/* Email */}
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                          htmlFor="card-email"
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="card-email"
                          className="text-sm text-gray-800 bg-white border rounded leading-5 py-2 px-3 border-gray-200 hover:border-gray-300 focus:border-indigo-300 shadow-sm placeholder-gray-400 focus:ring-0 w-full"
                          type="email"
                          placeholder="john@company.com"
                        />
                      </div>
                    </div>
                    {/* Form footer */}
                    <div className="mt-6">
                      <div className="mb-4">
                        <button
                          className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2"
                          onClick={handlePayment}
                        >
                          Pay Now
                        </button>
                      </div>
                      <div className="text-xs text-gray-500 italic text-center">
                        You'll be charged $253, including $48 for VAT in Italy
                      </div>
                    </div>
                  </div>
                )}

                {/* PayPal form */}
                {!isCard && (
                  <div>
                    <div className="mb-4">
                      <button className="font-medium text-sm inline-flex items-center justify-center px-3 py-2 border border-transparent rounded leading-5 shadow-sm transition duration-150 ease-in-out w-full bg-indigo-500 hover:bg-indigo-600 text-white focus:outline-none focus-visible:ring-2">
                        Pay with PayPal
                      </button>
                    </div>
                    {/* <div className="text-xs text-gray-500 italic text-center">
                      You'll be charged $253, including $48 for VAT in Italy
                    </div> */}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Payment;
