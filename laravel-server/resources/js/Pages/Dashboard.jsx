import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import img from "../../assets/logo.png";
import { Link, Head } from "@inertiajs/react";
import {
    handleToggleVideo,
    handleToggleRemoteVideo,
    hideVideo,
    showVideo,
} from "@/Services/VideoService";
import {
    handleToggleAudio,
    handleToggleRemoteAudio,
    hideAudio,
    showAudio,
} from "@/Services/AudioService";
import { copyURL } from "@/Services/URLSerivce";
import { addPeer, createPeer } from "@/Services/PeerService";

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

const Video = (props) => {
    const ref = useRef();
    console.log("video component peer");
    console.log(props.peer);
    useEffect(() => {
        props.peer.on("stream", (stream) => {
            ref.current.srcObject = stream;
            const videoTrack = stream
                .getTracks()
                .find((track) => track.kind === "audio");
            videoTrack.enabled = false;
        });
    }, []);

    return (
        <>
            <StyledVideo controls autoPlay ref={ref} />
        </>
    );
};

const getLastItem = (path) => path.substring(path.lastIndexOf("/") + 1);

export default function Dashboard({ auth }) {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const userStream = useRef();
    const [copied, setCopied] = useState(false);
    const [isVideo, setIsVideo] = useState(false);
    const [isAudio, setIsAudio] = useState(false);
    //const [isSharing, setIsSharing] = useState(false);
    const isAdmin = useRef(false);
    //const screenTrack = useRef();
    const hideButtons = useRef([]);
    const roomID = getLastItem(window.location.href);

    useEffect(() => {
        socketRef.current = io.connect(":8000");
        console.log(roomID);
        console.log(peers);
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                userStream.current = stream;
                console.log(userStream);
                userVideo.current.srcObject = stream;
                socketRef.current.emit("join room", roomID);
                socketRef.current.on("all users", (users) => {
                    console.log(`users: ${users}`);
                    if (users.length === 0) {
                        isAdmin.current = true;
                    }
                    const peers = [];
                    users.forEach((userID) => {
                        const peer = createPeer(
                            userID,
                            socketRef.current.id,
                            stream,
                            socketRef.current
                        );
                        peersRef.current.push({
                            peerID: userID,
                            peer,
                        });
                        peers.push({ peerID: userID, peer });
                    });
                    setPeers(peers);
                });

                socketRef.current.on("user joined", (payload) => {
                    const peer = addPeer(
                        payload.signal,
                        payload.callerID,
                        stream,
                        socketRef.current
                    );
                    peersRef.current.push({
                        peer,
                        peerID: payload.callerID,
                    });
                    const peerObj = { peer, peerID: payload.callerID };
                    setPeers((users) => [...users, peerObj]);
                    console.log("user joined");
                    console.log(peers);
                    if (isAdmin.current) {
                        console.log("i am admin");
                        hideButtons.current.push(
                            <>
                                <button
                                    onClick={(e) =>
                                        handleToggleRemoteVideo(
                                            e,
                                            socketRef.current
                                        )
                                    }
                                    data-id={payload.callerID}
                                    data-video="hide"
                                    className="bg-blue-500 rounded-full w-[100px] h-[100px] mr-6  text-white"
                                >
                                    <i className="fa-solid fa-video text-xl"></i>
                                </button>
                                <button
                                    onClick={(e) =>
                                        handleToggleRemoteAudio(
                                            e,
                                            socketRef.current
                                        )
                                    }
                                    data-id={payload.callerID}
                                    data-audio="hide"
                                    className="bg-blue-500 rounded-full w-[100px] h-[100px] mr-6  text-white"
                                >
                                    <i className="fa-solid fa-microphone text-xl"></i>
                                </button>
                            </>
                        );
                    }
                });

                socketRef.current.on("receiving returned signal", (payload) => {
                    const item = peersRef.current.find(
                        (p) => p.peerID === payload.id
                    );
                    item.peer.signal(payload.signal);
                    console.log("receive signal");
                });

                socketRef.current.on(
                    "hide cam",
                    hideVideo.bind(null, userStream.current)
                );
                socketRef.current.on(
                    "show cam",
                    showVideo.bind(null, userStream.current)
                );
                socketRef.current.on(
                    "hide audio",
                    hideAudio.bind(null, userStream.current)
                );
                socketRef.current.on(
                    "show audio",
                    showAudio.bind(null, userStream.current)
                );

                socketRef.current.on("user left", (id) => {
                    const peerObj = peersRef.current.find(
                        (p) => p.peerID === id
                    );
                    if (peerObj) {
                        peerObj.peer.destroy();
                    }
                    const peers = peersRef.current.filter(
                        (p) => p.peerID !== id
                    );
                    peersRef.current = peers;
                    setPeers(peers);
                });
            });
    }, []);

    const handleToggleShareScreen = (userstream) => {
        navigator.mediaDevices
            .getDisplayMedia({ cursor: true, audio: true })
            .then((stream) => {
                const videoTrack = userstream
                    .getTracks()
                    .find((track) => track.kind === "video");
                const screenTrack = stream.getTracks()[0];
                userstream.removeTrack(videoTrack);
                userstream.addTrack(screenTrack);
                peers.map((peer) => {
                    console.log(peer);
                    peer.peer.replaceTrack(videoTrack, screenTrack, userstream);
                });
            });
    };

    return (
        <>
            <Link href="/" className="flex justify-center">
                <img
                    className="h-32 w-32  text-white  lg:text-[#FF2D20]"
                    viewBox="0 0 62 65"
                    src={img}
                ></img>
            </Link>
            <div className="py-12">
                <div className="max-w-7xl  mx-auto sm:px-6 lg:px-8">
                    <div>
                        <StyledVideo
                            muted
                            controls
                            ref={userVideo}
                            autoPlay
                            playsInline
                        />
                        {peers.map((peer, index) => {
                            return (
                                <>
                                    <div className="flex">
                                        <Video
                                            key={peer.peerID}
                                            peer={peer.peer}
                                        />
                                        {hideButtons.current[index]}
                                    </div>
                                </>
                            );
                        })}
                        <div className="flex">
                            <button
                                onClick={() => {
                                    handleToggleVideo(userStream.current);
                                    setIsVideo(!isVideo);
                                }}
                                className="bg-black rounded-full w-[100px] h-[100px] mr-6  text-white"
                            >
                                {isVideo ? (
                                    <i className="fa-solid fa-video text-xl"></i>
                                ) : (
                                    <i className="fa-solid fa-video-slash text-xl"></i>
                                )}
                            </button>
                            <button
                                onClick={() => {
                                    handleToggleAudio(userStream.current);
                                    setIsAudio(!isAudio);
                                }}
                                className="bg-black rounded-full w-[100px] h-[100px] mr-6  text-white"
                            >
                                {isAudio ? (
                                    <i class="fa-solid fa-microphone text-xl"></i>
                                ) : (
                                    <i class="fa-solid fa-microphone-slash text-xl"></i>
                                )}
                            </button>
                            <Link
                                href="/"
                                className="flex items-center justify-center bg-black rounded-full w-[100px] h-[100px] mr-6  text-white"
                                onClick={() => {
                                    console.log("disconnect");
                                    socketRef.current.emit("exit");
                                }}
                            >
                                <i className="fa-solid fa-phone text-xl"></i>
                            </Link>
                            <button
                                onClick={() =>
                                    handleToggleShareScreen(userStream.current)
                                }
                                className="bg-black rounded-full w-[100px] h-[100px] mr-6  text-white"
                            >
                                <i class="fa-solid fa-desktop"></i>
                            </button>
                            <button
                                className="bg-black rounded-full w-[100px] h-[100px] mr-6  text-white"
                                onClick={() => {
                                    setCopied(true);
                                    copyURL;
                                }}
                            >
                                {!copied ? "Скопировать ссылку" : "Скопировано"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
