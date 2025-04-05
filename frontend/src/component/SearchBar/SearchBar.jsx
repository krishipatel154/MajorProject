import React, { useContext, useEffect, useState } from "react";
// import { ShopContext } from "../context/ShopContext";
import { IoSearchSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  // const { search, showSearch, setSearch, setShowSearch } =
  //   useContext(ShopContext);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.includes("books")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          type="text"
          placeholder="Search"
          className="flex-1 outline-none bg-inherit text-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <IoSearchSharp />
      </div>
      <RxCross2
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer text-3xl"
      />
    </div>
  ) : null;
};

export default SearchBar;
