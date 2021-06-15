import React, { useState } from "react";
import Logo from "../Heading/Logo/Logo";


import "./Navbar.css";

const Navbar = ({ classList }) => {
  //   const [profileImg, setProfileImg] = useState("");

  return (
    <div className={`navbar py-2 px-2 fixed-top ${classList ? classList : ""}`}>
      <div className="container px-0 d-flex justify-content-between align-items-center">
        <Logo />
  
      </div>
    </div>
  );
};

export default Navbar;
