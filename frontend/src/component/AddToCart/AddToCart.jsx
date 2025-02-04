import React from "react";
import { useNavigate } from "react-router-dom";

const AddToCart = () => {
  const navigate = useNavigate();
  const handleAddToCart = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      console.log("Added");
    }
  };
  return (
    <div>
      <button onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
};

export default AddToCart;
