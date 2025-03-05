import React from "react";

const ReedBook = ({ pdf }) => {
  console.log("Reed Book: ", pdf);
  const showPdf = (pdf) => {
    console.log(pdf);
    window.open(`http://localhost:8089/files/${pdf}`, "_blank", "noreferrer");
  };
  return (
    <button
      className="px-8 py-4 text-xl font-semibold dark:text-black dark:bg-white bg-text text-back hover:bg-text hover:text-back rounded transaction-all duration-300"
      onClick={() => showPdf(pdf)}
    >
      Read Book
      <p>{pdf}</p>
    </button>
  );
};

export default ReedBook;
