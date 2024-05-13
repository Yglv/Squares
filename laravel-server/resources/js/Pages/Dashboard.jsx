import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import GuestLayout from "@/Layouts/GuestLayout";
import img from "../../assets/logo.png";
import { Link, Head } from "@inertiajs/react";

const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

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
        });
    }, []);

    return (
        <>
            <StyledVideo controls playsInline autoPlay ref={ref} />
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
    const isAdmin = useRef(false);
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
                            stream
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
                    console.log("user joined");
                    if (isAdmin.current) {
                        console.log("i am admin");
                        hideButtons.current.push(
                            <>
                                <button
                                    onClick={(e) => handleToggleRemoteVideo(e)}
                                    data-id={payload.callerID}
                                    data-video="hide"
                                    className="bg-blue-500 rounded-full w-[100px] h-[100px] mr-6  text-white"
                                >
                                    <i className="fa-solid fa-video text-xl"></i>
                                </button>
                                <button
                                    onClick={(e) => handleToggleRemoteAudio(e)}
                                    data-id={payload.callerID}
                                    data-audio="hide"
                                    className="bg-blue-500 rounded-full w-[100px] h-[100px] mr-6  text-white"
                                >
                                    <i className="fa-solid fa-microphone text-xl"></i>
                                </button>
                            </>
                        );
                        console.log(hideButtons.current);
                    }
                    const peer = addPeer(
                        payload.signal,
                        payload.callerID,
                        stream
                    );
                    peersRef.current.push({
                        peer,
                        peerID: payload.callerID,
                    });

                    const peerObj = { peer, peerID: payload.callerID };
                    setPeers((users) => [...users, peerObj]);
                });

                socketRef.current.on("receiving returned signal", (payload) => {
                    const item = peersRef.current.find(
                        (p) => p.peerID === payload.id
                    );
                    item.peer.signal(payload.signal);
                });

                socketRef.current.on("hide cam", hideVideo);
                socketRef.current.on("show cam", showVideo);
                socketRef.current.on("hide audio", hideAudio);
                socketRef.current.on("show audio", showAudio);

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

    function createPeer(userToSignal, callerID, stream) {
        console.log(stream);
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });
        peer.on("signal", (signal) => {
            socketRef.current.emit("sending signal", {
                userToSignal,
                callerID,
                signal,
            });
        });

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        console.log(callerID);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        });

        peer.on("signal", (signal) => {
            socketRef.current.emit("returning signal", { signal, callerID });
        });

        peer.signal(incomingSignal);

        return peer;
    }

    const handleToggleVideo = (stream) => {
        console.log(stream);
        const videoTrack = stream
            .getTracks()
            .find((track) => track.kind === "video");
        if (videoTrack.enabled) {
            videoTrack.enabled = false;
            setIsVideo(true);
        } else {
            videoTrack.enabled = true;
            setIsVideo(false);
        }
    };

    const handleToggleAudio = (stream) => {
        console.log(stream);
        const audioTrack = stream
            .getTracks()
            .find((track) => track.kind === "audio");
        if (audioTrack.enabled) {
            audioTrack.enabled = false;
            setIsAudio(true);
        } else {
            audioTrack.enabled = true;
            setIsAudio(false);
        }
    };

    const handleToggleShareScreen = (userstream) => {
        navigator.mediaDevices
            .getDisplayMedia({ cursor: true, audio: true })
            .then((stream) => {
                const screenTrack = stream.getTracks()[0];
                const videoTrack = userstream
                    .getTracks()
                    .find((track) => track.kind === "video");
                userstream.removeTrack(videoTrack);
                userstream.addTrack(screenTrack);

                screenTrack.onended = function () {
                    videoTrack.replaceTrack(userstream.getTracks()[1]);
                };
            });
    };

    const handleToggleRemoteVideo = (e) => {
        if (e.target.getAttribute("data-video") === "hide") {
            e.target.setAttribute("data-video", "show");
            socketRef.current.emit(
                "hide remote cam",
                e.target.getAttribute("data-id")
            );
        } else {
            e.target.setAttribute("data-video", "hide");
            socketRef.current.emit(
                "show remote cam",
                e.target.getAttribute("data-id")
            );
        }
    };

    const handleToggleRemoteAudio = (e) => {
        if (e.target.getAttribute("data-audio") === "hide") {
            e.target.setAttribute("data-audio", "show");
            socketRef.current.emit(
                "hide remote audio",
                e.target.getAttribute("data-id")
            );
        } else {
            e.target.setAttribute("data-audio", "hide");
            socketRef.current.emit(
                "show remote audio",
                e.target.getAttribute("data-id")
            );
        }
    };

    function hideVideo() {
        console.log("hide remote video");
        const videoTrack = userStream.current
            .getTracks()
            .find((track) => track.kind === "video");
        videoTrack.enabled = false;
    }

    function showVideo() {
        const videoTrack = userStream.current
            .getTracks()
            .find((track) => track.kind === "video");
        videoTrack.enabled = true;
    }

    function hideAudio() {
        const videoTrack = userStream.current
            .getTracks()
            .find((track) => track.kind === "audio");
        videoTrack.enabled = false;
    }

    function showAudio() {
        const videoTrack = userStream.current
            .getTracks()
            .find((track) => track.kind === "audio");
        videoTrack.enabled = true;
    }

    function copy() {
        const el = document.createElement("input");
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(true);
    }

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
                                onClick={() =>
                                    handleToggleVideo(userStream.current)
                                }
                                className="bg-black rounded-full w-[100px] h-[100px] mr-6  text-white"
                            >
                                {isVideo ? (
                                    <i class="fa-solid fa-video text-xl"></i>
                                ) : (
                                    <i class="fa-solid fa-video-slash text-xl"></i>
                                )}
                            </button>
                            <button
                                onClick={() =>
                                    handleToggleAudio(userStream.current)
                                }
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
                                <i class="fa-solid fa-phone text-xl"></i>
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
                                onClick={copy}
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
