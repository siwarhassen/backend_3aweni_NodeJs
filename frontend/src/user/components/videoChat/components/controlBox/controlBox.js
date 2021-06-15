import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./controlBox.css";

// components
import Button, { CornerRoundButton } from "../buttons/Buttons/button";
import { useDataLayerValue } from "../../contexts/DataLayer";
import CreateRoom from "../modal/CreateModal";

//context
import { SocketIoContext } from "../../contexts/SocketContext";

// icons
import {
  FaMicrophone,
  FaVideo,
  FaShareSquare,
  FaRocketchat,
  FaUsers,
  FaMicrophoneSlash,
  FaVideoSlash,
} from "react-icons/fa";

const ControlBox = ({ muteAudio, showVideoFunc, audioVideo }) => {
  // props
  const { muted, showVideo } = audioVideo;

  const [{ showChatBox, showParticipants }, dispatch] = useDataLayerValue();
  const history = useHistory();

  const { socket } = useContext(SocketIoContext);

  // useState
  const [sharingLink, setSharingLink] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    let url = window.location.href;
    setUrl(url);
  }, [url]);

  // leave function
  const leaveFunction = () => {
    console.log("leave", history);
    socket.disconnect();
    history.push("/home");
  };

  // chat function
  const changeChat = () => {
    dispatch({
      type: "OPEN_CHAT",
      chat: !showChatBox,
    });
  };

  // participants function
  const changeParticipants = () => {
    dispatch({
      type: "OPEN_PARTICIPANTS",
      participants: !showParticipants,
    });
  };

  // sharing link function
  const sharingLinkFunc = () => {
    setSharingLink(!sharingLink);
  };

  return (
    <div className="bottom__button__box position-absolute w-100 d-flex justify-content-between align-items-center">
      {/* left box */}
      <div className="bottom_button_box__left_box d-flex align-items-center justify-content-between p-3">
        {/* check user muted or not */}
        {muted ? (
          <Button
            onClick={muteAudio}
            classList="mr-3 bg_color_red"
            icon={<FaMicrophoneSlash size={30} />}
          />
        ) : (
          <Button
            onClick={muteAudio}
            classList="mr-3 bg_color_white"
            icon={<FaMicrophone size={30} />}
          />
        )}
        {/* check user showing video or not */}
        {showVideo ? (
          <Button
            onClick={showVideoFunc}
            classList="mr-3 bg_color_white"
            icon={<FaVideo size={30} />}
          />
        ) : (
          <Button
            onClick={showVideoFunc}
            classList="mr-3 bg_color_red"
            icon={<FaVideoSlash size={30} />}
          />
        )}
      </div>
      {/* middle box */}
      <div className="bottom_button_box__middle_box flex-fill d-flex justify-content-center align-items-center">
        {/* chat btn */}
        <butt
          classList="mr-3 bg_color_white"
          icon={<FaRocketchat size={30} />}
          onClick={changeChat}
        />
        {/* share btn */}
        <CornerRoundButton
          classList="bg_color_green px-4 py-3 mr-3 color_black"
          content={<FaShareSquare size={30} />}
          onClick={sharingLinkFunc}
        />
        {/* share btn end */}
        {/* participants btn */}
        <Button
          classList="mr-3 bg_color_white"
          icon={<FaUsers size={30} />}
          onClick={changeParticipants}
        />
        {/* participants btn end */}
      </div>
      {/* right box */}
      <div className="bottom_button_box__right_box d-flex justify-content-center align-items-center p-3">
        <CornerRoundButton
          onClick={leaveFunction}
          classList="bg_color_red px-4 py-2 color_white"
          content="Leave"
        />
      </div>
      {/* right box end */}

      {/* modal for sharing link */}
      {sharingLink ? (
        <CreateRoom
          show
          onclick={sharingLinkFunc}
          btnClick
          value={url}
          placeholder="Enter Your Room"
          btnName="Copy"
          title="Copy Your URL"
        />
      ) : (
        <CreateRoom />
      )}
    </div>
  );
};

export default ControlBox;
