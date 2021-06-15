import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";
import "./CreateModal.css";

// components
import Input from "../input/input";
import PrimaryButton from "../buttons/primaryButton/PrimaryButton";

const CreateRoom = ({
  show,
  onclick,
  title,
  btnName,
  placeholder,
  value,
  btnClick,
}) => {
  const [room, setRoom] = useState("");
  const [copy, setCopy] = useState(false);

  // copy text function
  const copyTextFunc = () => {
    setCopy(true);
    console.log(copy);
  };

  return (
    <>
      {/* modal background */}
      <div
        className={`create_room__modal-background ${show ? "showModal" : ""}`}
        onClick={onclick}
      ></div>
      {/* modal box */}
      <div
        className={`create_room__modal p-4 bg-white rounded-lg ${
          show ? "showModal" : ""
        }`}
      >
        <p className="text__paragraph font-weight-bold mb-4">{title}</p>
        {copy ? (
          <Input
            classList="mb-4"
            placeholder={placeholder}
            setroom={setRoom}
            value={value}
            copy
          />
        ) : (
          <Input
            classList="mb-4"
            placeholder={placeholder}
            setroom={setRoom}
            value={value}
          />
        )}

        {/* if btn click is enable */}
        {btnClick ? (
          <PrimaryButton bgBlue text={btnName} onClick={copyTextFunc} />
        ) : (
          <Link
          target="_blank"
            classList="text-decoration-none"
            onClick={(e) => {
              if (!room) {
                e.preventDefault();
              }
            }}
            to={`/meeting?room=${room}&roomId=${v4()}`}
          >
            <PrimaryButton bgBlue text={btnName} />
          </Link>
        )}
      </div>
    </>
  );
};

export default CreateRoom;
