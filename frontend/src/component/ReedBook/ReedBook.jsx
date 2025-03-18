import React from "react";

const ReedBook = ({ pdf }) => {
  const showPdf = (pdf) => {
    window.open(`http://localhost:8089/files/${pdf}`, "_blank", "noreferrer");
  };
  return (
    <button
      className="p-2 mt-4 text-xl font-semibold dark:text-black dark:bg-white bg-text text-back hover:bg-text hover:text-back rounded transaction-all duration-300"
      onClick={() => showPdf(pdf)}
    >
      Read Book
    </button>
  );
};

export default ReedBook;
