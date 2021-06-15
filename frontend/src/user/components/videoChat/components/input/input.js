import React, { useEffect } from "react";
import "./input.css";

const Input = ({ placeholder, classList, setroom, value, copy }) => {
  if (copy) {
    // for copy the url from clipboard
    const input = document.querySelector("#input");
    input.select();
    document.execCommand("copy");
  }

  return (
    <input
      id="input"
      className={`input py-3 px-4 w-100 ${classList ? classList : ""}`}
      type="text"
      placeholder={placeholder}
      value={value && value}
      onChange={(e) => setroom(e.target.value)}
    />
  );
};

export default Input;
