import React from "react";
import { FaReact, FaNodeJs, FaJava, FaHtml5 } from "react-icons/fa";
import { MdLocalLibrary } from "react-icons/md";

const BookNav = ({ onCategorySelect }) => {
  return (
    <div className="navbar flex space-x-4">
      <div className="relative group" onClick={() => onLanguageSelect("All")}>
        <div className="border rounded-lg p-4 hover:bg-gray-200 transition">
          <MdLocalLibrary size={30} />
        </div>
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 bg-gray-800 text-white text-sm rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
          All
        </span>
      </div>

      <div className="relative group" onClick={() => onCategorySelect("React")}>
        <div className="border rounded-lg p-4 hover:bg-gray-200 transition">
          <FaReact size={30} />
        </div>{" "}
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 bg-gray-800 text-white text-sm rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
          All
        </span>
      </div>

      <div className="relative group" onClick={() => onCategorySelect("React")}>
        <div className="border rounded-lg p-4 hover:bg-gray-200 transition">
          <MdLocalLibrary size={30} />
        </div>{" "}
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 bg-gray-800 text-white text-sm rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
          All
        </span>
      </div>
    </div>
  );
};

export default BookNav;
