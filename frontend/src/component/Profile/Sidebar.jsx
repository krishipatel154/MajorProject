import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ data }) => {
  return (
    <div className="bg-back dark:bg-zinc-800 h-[100%] p-4 rounded flex flex-col items-center justify-between">
      <div className="flex items-center flex-col justify-center">
        <img src={data.avatar} className="h-[12vh]" alt="" />
        <p className="mt-3 text-xl text-zinc-300 font-semibold">
          {data.FirstName}
        </p>
        <p className="mt-1 text-zinc-300 text-normal">{data.Email}</p>
        <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>
      </div>

      <div className="w-full flex-col items-center justify-center hidden lg:flex">
        <Link
          to="/profile"
          className="text-zinc-300 font-semibold w-full py-2 text-center hover:bg-[#03476F] rounded transaction-all duration-300  dark:hover:bg-black"
        >
          Favourites
        </Link>
        <Link
          to="/profile/orderHistory"
          className="text-zinc-300 font-semibold w-full py-2 mt-4 text-center hover:bg-[#03476F] rounded transaction-all duration-300  dark:hover:bg-black"
        >
          Order History
        </Link>
        <Link
          to="/profile/settings"
          className="text-zinc-300 font-semibold w-full py-2 mt-4 text-center hover:bg-[#03476F] rounded transaction-all duration-300  dark:hover:bg-black"
        >
          Settings
        </Link>
      </div>
      <button className="dark:bg-zinc-900 bg-text text-black dark:text-text w-3/6 lg:w-full mt-4 lg:mt-0 font-semibold flex justify-center items-center py-2 rounded hover:bg-white hover:text-zinc-900 transiction-all duration-300">
        Logout <FaArrowRight className="ms-4" />
      </button>
    </div>
  );
};

export default Sidebar;
