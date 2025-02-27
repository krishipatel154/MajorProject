import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const MobileNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);
  return (
    <div className="w-full flex items-center justify-between mt-4 lg:hidden">
      {role === "user" && (
        <>
          <Link
            to="/profile"
            className="text-zinc-300 font-semibold w-full text-center hover:bg-[#03476F] rounded transaction-all duration-300  dark:hover:bg-black"
          >
            Favourites
          </Link>
          <Link
            to="/profile/orderHistory"
            className="text-zinc-300 font-semibold w-full text-center hover:bg-[#03476F] rounded transaction-all duration-300  dark:hover:bg-black"
          >
            Order History
          </Link>
          <Link
            to="/profile/settings"
            className="text-zinc-300 font-semibold w-full text-center hover:bg-[#03476F] rounded transaction-all duration-300  dark:hover:bg-black"
          >
            Settings
          </Link>
        </>
      )}
      {role === "user" && (
        <>
          <Link
            to="/profile"
            className="text-zinc-300 font-semibold w-full text-center hover:bg-[#03476F] rounded transaction-all duration-300  dark:hover:bg-black"
          >
            All Orders
          </Link>
          <Link
            to="/profile/add-course"
            className="text-zinc-300 font-semibold w-full text-center hover:bg-[#03476F] rounded transaction-all duration-300  dark:hover:bg-black"
          >
            Add Course
          </Link>
          <Link
            to="/profile/add-book"
            className="text-zinc-300 font-semibold w-full text-center hover:bg-[#03476F] rounded transaction-all duration-300  dark:hover:bg-black"
          >
            Add Book
          </Link>
        </>
      )}
    </div>
  );
};

export default MobileNav;
