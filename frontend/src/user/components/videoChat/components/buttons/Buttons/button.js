import React from "react";
import "./button.css";

const Button = ({ icon, classList, onClick }) => {
  return (
    <div
      onClick={onClick && onClick}
      className={`button p-3 d-flex align-items-center rounded-circle ${
        classList ? classList : ""
      }`}
    >
      {icon && icon}
    </div>
  );
};

export const CornerRoundButton = ({ classList, content, onClick }) => {
  return (
    <div
      onClick={onClick && onClick}
      style={{ fontSize: 25, letterSpacing: 3, borderRadius: 10 }}
      className={`cornerButton font-weight-bold d-flex align-items-center justify-content-center ${
        classList ? classList : ""
      }`}
    >
      {content && content}
    </div>
  );
};

export default Button;
