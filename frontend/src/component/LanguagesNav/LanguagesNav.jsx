import React from "react";
import { Link } from "react-router-dom";

const LanguagesNav = () => {
  const btnpressprev = () => {
    let box = document.getElementById("product-container");
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft - width;
  };
  const btnpressnext = () => {
    let box = document.getElementById("product-container");
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft + width;
  };
  return (
    <>
      <div className="relative overflow-hidden w-[100%] h-[40px] p-[5px] flex items-center justify-center bg-text dark:bg-black dark:text-text">
        <button
          className="prev-btn w-[40px] h-[40px] absolute top-0 flex items-center justify-center align-center left-0"
          onClick={btnpressprev}
        >
          <p className="bg-gray-400 text-black rounded-full w-[25px] h-[25px] opacity-1 flex justify-center items-center m-auto">
            &lt;
          </p>
        </button>
        <button
          className="next-btn w-[40px] h-[40px] absolute top-0 flex items-center justify-center align-center right-0"
          onClick={btnpressnext}
        >
          <p className="bg-gray-400 text-black rounded-full w-[25px] h-[25px] opacity-1 flex justify-center items-center m-auto">
            &gt;
          </p>
        </button>

        <div
          className="py-[10px] flex overflow-hidden  w-[95%]"
          id="product-container"
        >
          <ul className="flex justify-center items-center gap-[250px]">
            <li>
              <Link to="/language/:html">HTML</Link>
            </li>
            <li>
              <Link to="/language/:css">css</Link>
            </li>
            <li>
              <Link to="/language/:js">JavaScript</Link>
            </li>
            <li>
              <Link to="/language/:java">Java</Link>
            </li>
            <li>
              <Link to="/language/:python">Python</Link>
            </li>
            <li>
              <Link to="/language/:cpp">C++</Link>
            </li>
            <li>
              <Link to="/language/:c">C</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default LanguagesNav;
