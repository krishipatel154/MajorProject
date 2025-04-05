import React from "react";

const Title = ({ text1 }) => {
  return (
    <div className="inline-flex gap-2 items-center m-4">
      <h1 className="font-bold text-3xl text-back dark:text-black">{text1}</h1>
    </div>
  );
};

export default Title;
