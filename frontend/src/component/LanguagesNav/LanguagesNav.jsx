import React, { useEffect, useState } from "react";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";
import axios from "axios";

const LanguagesNav = () => {
  const [file, setFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfName, setPdfName] = useState(null);

  const getPdf = async () => {
    const response = await axios.get(
      "http://localhost:8089/material/get-material"
    );
    setFile(response.data.data);
    const defaultPdf = response.data.data.find((item) => item.Name === "HTML");

    if (defaultPdf) {
      showPdf(defaultPdf.Pdf, defaultPdf.Name);
    }
  };

  useEffect(() => {
    getPdf();
  }, []);

  const showPdf = (pdf, name) => {
    const fullPdfUrl = `http://localhost:8089/files/${pdf}`;
    setPdfFile(fullPdfUrl);
    setPdfName(name);
  };

  const docs = pdfFile ? [{ uri: pdfFile }] : [];

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
      <div className="relative overflow-hidden w-full h-[60px] p-[5px] flex items-center justify-center bg-gradient-to-r from-[#03506F] to-[#075670] dark:from-black dark:to-gray-900 shadow-lg">
        <button
          className="prev-btn w-[40px] h-[40px] absolute top-1/2 -translate-y-1/2 left-4 flex items-center justify-center align-center bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300"
          onClick={btnpressprev}
        >
          <p className="text-white text-xl font-bold">&lt;</p>
        </button>
        <button
          className="next-btn w-[40px] h-[40px] absolute top-1/2 -translate-y-1/2 right-4 flex items-center justify-center align-center bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300"
          onClick={btnpressnext}
        >
          <p className="text-white text-xl font-bold">&gt;</p>
        </button>

        <div
          className="py-[10px] flex overflow-hidden w-[90%] scroll-smooth"
          id="product-container"
        >
          <ul className="flex justify-center items-center gap-[200px]">
            {file === null
              ? ""
              : file.map((data, i) => (
                  <li
                    key={i}
                    onClick={() => showPdf(data.Pdf, data.Name)}
                    className="cursor-pointer text-white hover:text-zinc-200 transition-colors duration-300 text-lg font-medium relative group"
                  >
                    {data.Name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                  </li>
                ))}
          </ul>
        </div>
      </div>
      {pdfFile ? (
        <div className="mt-8 mx-auto max-w-6xl px-4">
          <div className="bg-back dark:bg-black rounded-lg shadow-xl overflow-hidden">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold text-white">{pdfName}</h2>
            </div>
            <div className="p-4">
              <DocViewer
                documents={docs}
                pluginRenderers={DocViewerRenderers}
                className="bg-back dark:bg-black"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center min-h-[70vh]">
          <div className="text-center">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Select a language to view its documentation
            </p>
            <div className="mt-4 animate-bounce">
              <svg
                className="w-8 h-8 mx-auto text-[#03506F] dark:text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LanguagesNav;
