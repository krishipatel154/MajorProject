import React from "react";
import { FaReact, FaNodeJs, FaJava, FaHtml5, FaCss3Alt,FaPython   } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io5";
import { SiMongodb } from "react-icons/si";
import { BsFiletypeSql } from "react-icons/bs";
import { MdLocalLibrary } from "react-icons/md";

const BookNav = ({ onCategorySelect }) => {
  return (
    <div className="navbar flex space-x-4">
      <div className="relative group" onClick={() => onCategorySelect("All")}>
        <div className="border rounded-lg p-4 hover:bg-gray-200 transition">
          <MdLocalLibrary size={30} />
        </div>
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 bg-gray-800 text-white text-sm rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
          All
        </span>
      </div>
      <div className="relative group" onClick={() => onCategorySelect("ReactJs")}>
        <div className="border rounded-lg p-4 hover:bg-gray-200 transition">
          <FaReact size={30} />
        </div>{" "}
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 bg-gray-800 text-white text-sm rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
          ReactJs
        </span>
      </div>
      <div className="relative group" onClick={() => onCategorySelect("NodeJs")}>
        <div className="border rounded-lg p-4 hover:bg-gray-200 transition">
          <FaNodeJs size={30} />
        </div>{" "}
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 bg-gray-800 text-white text-sm rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
          NodeJs
        </span>
      </div>
      <div className="relative group" onClick={() => onCategorySelect("Java")}>
        <div className="border rounded-lg p-4 hover:bg-gray-200 transition">
          <FaJava size={30} />
        </div>{" "}
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 bg-gray-800 text-white text-sm rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
          Java
        </span>
      </div>
      <div className="relative group" onClick={() => onCategorySelect("CSS")}>
        <div className="border rounded-lg p-4 hover:bg-gray-200 transition">
          <FaCss3Alt size={30} />
        </div>{" "}
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 bg-gray-800 text-white text-sm rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
          CSS
        </span>
      </div>
      <div className="relative group" onClick={() => onCategorySelect("HTML")}>
        <div className="border rounded-lg p-4 hover:bg-gray-200 transition">
          <FaHtml5 size={30} />
        </div>{" "}
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 bg-gray-800 text-white text-sm rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
          HTML
        </span>
      </div>
      <div className="relative group" onClick={() => onCategorySelect("SQL")}>
        <div className="border rounded-lg p-4 hover:bg-gray-200 transition">
          <BsFiletypeSql size={30} />
        </div>{" "}
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 bg-gray-800 text-white text-sm rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
          SQL
        </span>
      </div>
      <div className="relative group" onClick={() => onCategorySelect("JavaScript")}>
        <div className="border rounded-lg p-4 hover:bg-gray-200 transition">
          <IoLogoJavascript size={30} />
        </div>{" "}
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 bg-gray-800 text-white text-sm rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
          JavaScript
        </span>
      </div>
      <div className="relative group" onClick={() => onCategorySelect("MongoDB")}>
        <div className="border rounded-lg p-4 hover:bg-gray-200 transition">
          <SiMongodb size={30} />
        </div>{" "}
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 bg-gray-800 text-white text-sm rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
          MongoDB
        </span>
      </div>
      <div className="relative group" onClick={() => onCategorySelect("Python")}>
        <div className="border rounded-lg p-4 hover:bg-gray-200 transition">
          <FaPython size={30} />
        </div>{" "}
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 bg-gray-800 text-white text-sm rounded-lg py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
          Python
        </span>
      </div>
    </div>
  );
};

export default BookNav;
