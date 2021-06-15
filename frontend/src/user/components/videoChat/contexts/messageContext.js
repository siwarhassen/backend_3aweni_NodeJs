import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";

// fetch context
import { SocketIoContext } from "./SocketContext";

// create context
export const MessagesContext = createContext();

// ---------------------------------------------------------

const MessageContext = ({ children }) => {
  // all messages
  const [messages, setMessages] = useState([]);
  // contexts
  const { socket } = useContext(SocketIoContext);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = socket;
    console.log("receive");

    // receive message
    socketRef.current.on("message", ({ message, senderData }) => {
      setMessages([...messages, { msg: message, senderData }]);
    });
  }, [messages]);

  // send message
  const sendMessage = (message) => {
    // console.log(message);
    socketRef.current.emit("sending message", message);
  };

  return (
    <MessagesContext.Provider value={{ messages, sendMessage }}>
      {children}
    </MessagesContext.Provider>
  );
};

export default MessageContext;
