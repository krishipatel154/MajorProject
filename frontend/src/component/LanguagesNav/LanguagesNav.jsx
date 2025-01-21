import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const LanguagesNav = () => {
  const btnpressprev = () => {
    let box = document.getElementById("product-container");
    console.log(box);
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft - width;
    console.log(width);
  };
  const btnpressnext = () => {
    let box = document.getElementById("product-container");
    console.log(box);
    let width = box.clientWidth;
    box.scrollLeft = box.scrollLeft + width;
    console.log(width);
  };
  return (
    <>
      <div className="languages-nav dark:bg-black dark:text-white">
        <button className="prev-btn" onClick={btnpressprev}>
          <p>&lt;</p>
        </button>
        <button className="next-btn" onClick={btnpressnext}>
          <p>&gt;</p>
        </button>

        <div className="product-container " id="product-container">
          <ul className="flex">
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
