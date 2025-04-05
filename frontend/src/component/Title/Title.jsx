import React from "react";

const Title = ({ text1 }) => {
  return (
    <div className="inline-flex gap-2 items-center mb-3">
      <h1 className="font-bold text-3xl">{text1}</h1>
    </div>
  );
};

export default Title;
