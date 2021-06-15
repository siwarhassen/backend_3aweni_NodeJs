import React from "react";
import "./ChatInput.css";

import { FaArrowAltCircleRight } from "react-icons/fa";

const ChatInput = ({ sendMessage, setMessage, message }) => {
  return (
    <div className="input-box bg_color_white p-2 w-100">
      <form className="d-flex justify-content-between">
        <input
          className="input px-3 py-2 flex-fill mr-2"
          type="text"
          placeholder="Type Your Message..."
          value={message && message}
          onChange={({ target: { value } }) => setMessage(value)}
        />
        <button
          className="chatButton d-flex align-items-center border-0 color_primary"
          type="submit"
          onClick={(e) => sendMessage(e)}
          // for enter press
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        >
          <FaArrowAltCircleRight />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
