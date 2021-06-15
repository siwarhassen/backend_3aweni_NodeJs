import React, { useState, useEffect, useRef, useContext } from "react";
import queryString from "query-string";
import Peer from "simple-peer";
import "./Meeting.css";

// context
import { useDataLayerValue } from "../../contexts/DataLayer";
import { SocketIoContext } from "../../contexts/SocketContext";

// components
import Navbar from "../../components/navbar/Navbar";


const videoConstraints = {
  height: "100%",
  width: "100%",
};

// -------------------------------- Child Component ---------------------------------------
const Video = ({ peer }) => {
  const ref = useRef();

  useEffect(() => {
    peer.on("stream", (stream) => {
      ref.current.srcObject = stream;
    });
  }, []);

  return <video className="video" ref={ref} autoPlay style={{marginRight:"1000px",marginTop:"150px",minWidth:"700px",minHeight:"815px"}} />;
};

// --------------------------------- Parent Component ---------------------------------------
const Meeting = ({ location }) => {
  // state
  const [muted, setMuted] = useState(false);
  const [showVideo, setShowVideo] = useState(true);

  // contexts
  const [state, dispatch] = useDataLayerValue();
  const { socket } = useContext(SocketIoContext);
  // peers
  const [peers, setPeers] = useState([]);
  // use refs
  const socketRef = useRef();
  const userVideo = useRef();
  const peersRef = useRef([]);
  const roomIdRef = useRef();
  const myVideoStream = useRef();

  useEffect(() => {
    // get the user data
 
    const name = "profile.name";
    const imageUrl = "profile.profile_img";
    // get the room data
    const query = queryString.parse(location.search);
    const roomName = query.room;
    roomIdRef.current = query.roomId;
    // connect with server
    socketRef.current = socket;
    // get the user media
    navigator.mediaDevices
      .getUserMedia({ video: videoConstraints, audio: true })
      .then((stream) => {
        // set my video src
        userVideo.current.srcObject = stream;
        // getting my video access
        myVideoStream.current = stream;
        // interact with server
        socketRef.current.emit("join user", {
          roomID: roomIdRef.current,
          roomName,
          name,
          imageUrl,
        });
        socketRef.current.on("all users", (userInThisRoom) => {
          console.log(userInThisRoom);
          // add all users to the reducer
          dispatch({
            type: "ADD_ALL_USERS",
            users: userInThisRoom,
          });
          const peers = [];
          // send the signal to all users in this room
          userInThisRoom.forEach((user) => {
            // create New Peer
            const peer = createNewPeer(
              user.userId,
              socketRef.current.id,
              stream
            );
            // push the peer
            peersRef.current.push({
              peerId: user.userId,
              peer, // peer : peer
            });
            peers.push({
              peerId: user.userId,
              peer,
            });
          });
          // set all the peers into to state
          setPeers(peers);
        });
        // =========== new user join =======
        socketRef.current.on("user join", (callerId, signal, callerData) => {
          console.log("new user joined !!", callerId, callerData);
          // add the callerdata to the reducer
          dispatch({
            type: "ADD_ALL_USERS",
            users: [callerData],
          });
          const peer = addPeer(callerId, signal, stream);
          // push the peer
          peersRef.current.push({
            peerId: callerId,
            peer,
          });
          const peerObj = {
            peerId: callerId,
            peer,
          };
          console.log("peerObj", peerObj, peers);
          // set the state without changing others value
          setPeers((peers) => [...peers, peerObj]);
        });

        // ============= recieving signal =============
        socketRef.current.on("recieving returning signal", ({ signal, id }) => {
          const item = peersRef.current.find((peer) => peer.peerId === id);
          // peering caller signal
          item.peer.signal(signal);
        });

        console.log("peers", peers);

        // =============== user left ==================
        socketRef.current.on("user left", (id) => {
          // getting the peerObj from ref
          const peerObj = peersRef.current.find((peer) => peer.peerId === id);
          // destroy the peer
          if (peerObj) {
            peerObj.peer.destroy();
          }
          console.log("before", peers);
          // set the peer
          const peer = peersRef.current.filter((peer) => peer.peerId !== id);
          peersRef.current = peer;
          setPeers(peer);

          console.log("after", peers);
        });
      });
  }, []);

  console.log("Peers", peers);

  // ==================== craete new peer ===============
  function createNewPeer(userToSignal, callerId, stream) {
    console.log("hey hey");
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("sending signal", {
        userToSignal,
        callerId,
        signal,
        roomID: roomIdRef.current,
      });
    });

    return peer;
  }

  // =================== add new peer =========================
  function addPeer(callerId, incomingSignal, stream) {
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream,
    });

    peer.on("signal", (signal) => {
      socketRef.current.emit("returning signal", { callerId, signal });
    });

    peer.signal(incomingSignal);

    return peer;
  }
  //share screen 
   // mute
  async function sharescreen () {
    let captureStream = null;

  try {
    captureStream = await navigator.mediaDevices.getDisplayMedia();
    userVideo.current.srcObject=captureStream;
    
  } catch(err) {
    console.error("Error: " + err);
  }
  console.log (captureStream);
}

  // mute
  const muteAudio = () => {
    let audio = myVideoStream.current.getAudioTracks()[0].enabled;
    if (audio) {
      setMuted(true);
      myVideoStream.current.getAudioTracks()[0].enabled = false;
      document.getElementById("micro").name = "mic-off-circle-outline";
    } else {
      setMuted(false);
      myVideoStream.current.getAudioTracks()[0].enabled = true;
      document.getElementById("micro").name = "mic-circle-outline";
    }
    console.log(muted);
  };
   // leave function
   const leaveFunction = () => {
    if (window.confirm('Are you sure you want to exit this video call ?')) {
      socket.disconnect();
      window.close()  ;
    } else {
  
    }
  
  };

  // show video
  const showVideoFunc = () => {
    let video = myVideoStream.current.getVideoTracks()[0].enabled;
    if (video) {
      setShowVideo(false);
      myVideoStream.current.getVideoTracks()[0].enabled = false;
      document.getElementById("video").name = "videocam-off-outline";
        } else {
      setShowVideo(true);
      myVideoStream.current.getVideoTracks()[0].enabled = true;
      document.getElementById("video").name = "videocam-outline";
    }
    console.log(showVideo);
  };

  // =================== render here ==========================
  return (
    <div className="meeting__page d-flex flex-column" style={{backgroundColor:"black"}}>
      <Navbar />
 
      <div className="container-fluid pt-4 pb-3 mt-5 flex-fill d-flex overflow-hidden">
        <div className="meeting__box overflow-hidden h-100 flex-wrap flex-fill d-flex justify-content-center align-items-center position-relative">
          <div className="vedio__box p-1 d-flex justify-content-center">
            <video  className="video" ref={userVideo} autoPlay muted style={{ maxWidth:"200px",position: "absolute", marginTop:"750px",zIndex:30}}/>
          </div>
          {peers.map((peer) => (
            <div
              key={peer.peerId}
              className="vedio__box p-1 d-flex justify-content-center"
            >
              <Video peer={peer.peer} />
            </div>
          ))}
          {/* control box */}
          <button onClick={muteAudio} style={{ maxWidth:"200px",position: "absolute", marginTop:"600px" , marginRight:"140px" }} > <ion-icon name="mic-circle-outline"  id ="micro" style={{  color : "white" ,  fontSize :"50px"}}></ion-icon> </button>
          <button onClick={showVideoFunc} style={{ maxWidth:"200px",position: "absolute", marginTop:"600px",  marginRight:"290px"}} > <ion-icon name="videocam-outline"  id ="video" style={{  color : "white" ,  fontSize :"50px"}}></ion-icon> </button>
          <button onClick={sharescreen} style={{ maxWidth:"200px",position: "absolute", marginTop:"600px" , marginRight:"440px"}} > <ion-icon name="desktop-outline" style={{  color : "white" ,  fontSize :"50px"}}></ion-icon> </button>
          <button onClick={leaveFunction} style={{ maxWidth:"200px",position: "absolute", marginTop:"600px" , marginRight:"590px"}} > <ion-icon name="exit-outline" style={{  color : "white" ,  fontSize :"50px"}}></ion-icon> </button>

        </div>
    
      </div>
    </div>
  );
};

export default Meeting;
