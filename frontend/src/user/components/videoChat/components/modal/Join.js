import React, { useState, useEffect } from "react";


import "./CreateModal.css";


const JoinRoom = ({
  show,
  onclick,
  title,
  btnName,
  btnClick,
  
}) => {

    const [input, setInput] = useState('');
  const fbShare = () => {
  
    window.open(input, 'sharer', 'toolbar=0,status=0,width=1100,height=725, overflow: hidden');
}

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
       

        <input  classList="mb-4"
            placeholder="Paste The Room URL" onKeyUp={fbShare}    value={input} onInput={e => setInput(e.target.value)}  >
         </input>

           
     
      </div>
    
    </>
  );
};

export default JoinRoom;
