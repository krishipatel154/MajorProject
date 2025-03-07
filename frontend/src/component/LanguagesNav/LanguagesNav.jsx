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
    const defaultPdf = response.data.data.find(
      (item) => item.Name === "Cloud Computing"
    );

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
          className="py-[10px] flex overflow-hidden w-[95%]"
          id="product-container"
        >
          <ul className="flex justify-center items-center gap-[250px]">
            {file === null
              ? ""
              : file.map((data, i) => (
                  <li
                    key={i}
                    onClick={() => showPdf(data.Pdf, data.Name)}
                    className="cursor-pointer"
                  >
                    {data.Name}
                  </li>
                ))}
          </ul>
        </div>
      </div>
      {pdfFile ? (
        <div className="mt-4">
          <DocViewer
            documents={docs}
            pluginRenderers={DocViewerRenderers}
            // style={{ width: "75%", margin: "auto" }}
          />
        </div>
      ) : (
        <p>Select a PDF to view</p>
      )}
    </>
  );
};

export default LanguagesNav;
