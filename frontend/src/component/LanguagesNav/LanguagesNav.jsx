import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "../PdfComp";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.js",
//   import.meta.url
// ).toString();

const LanguagesNav = () => {
  const [allImage, setAllImage] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    const result = await axios.get(
      "http://localhost:8089/material/get-material"
    );
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const handleShowMaterial = (pdf) => {
    console.log(pdf);
    window.open(`http://localhost:8089/files/${pdf}`, "_blank", "noreferrer");
  };

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
      <div className="relative overflow-hidden w-[100%] h-[50px] p-[5px] flex items-center justify-center bg-text dark:bg-black dark:text-text">
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
            {allImage == null
              ? ""
              : allImage.map((data, i) => (
                  <>
                    <button key={i} onClick={handleShowMaterial(data.Pdf)}>
                      {data.Name}
                    </button>
                    <p>{data.Pdf}</p>
                  </>
                ))}
          </ul>
        </div>
      </div>
      <PdfComp />
    </>
  );
};

export default LanguagesNav;
