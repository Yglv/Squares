import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { Link } from "@inertiajs/react";
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
import {
    showShareScreen,
    hideShareScreen,
} from "@/Services/ShareScreenService";
import Canvas from "../../Components/Canvas/Canvas";
import Video from "../../Components/Video/Video";
import adapter from "webrtc-adapter";

const getLastItem = (path) => path.substring(path.lastIndexOf("/") + 1);

export default function Room({ auth }) {
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const userStream = useRef();
    const [copied, setCopied] = useState(false);
    const [isVideo, setIsVideo] = useState(false);
    const [isAudio, setIsAudio] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
    const [isCanvas, setIsCanvas] = useState(false);
    const isAdmin = useRef(false);
    const screenTrack = useRef();
    const hideButtons = useRef([]);
    const roomID = getLastItem(window.location.href);

    useEffect(() => {
        socketRef.current = io.connect(":8000");
        adapter.browserDetails.browser;
        console.log(roomID);
        console.log(peers);
        console.log(navigator.mediaDevices);
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                userStream.current = stream;
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
                    if (isAdmin.current) {
                        console.log("i am admin");
                        hideButtons.current.push(
                            <>
                                <div className="flex bg-black w-[200px] h-[25px] rounded-lg  shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05]  absolute  top-[5px] left-[40%] z-50 ">
                                    <button
                                        onClick={(e) =>
                                            handleToggleRemoteVideo(
                                                e,
                                                socketRef.current
                                            )
                                        }
                                        data-id={payload.callerID}
                                        data-video="hide"
                                        className="flex bg-black items-center justify-center  w-[50%] h-full pl-4 pr-4  border-r-2 border-white  z-1000 text-white hover:bg-gray-500"
                                    >
                                        <i className="fa-solid fa-video text-white text-sm text-center"></i>
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
                                        className="flex bg-black items-center justify-center  w-[50%] h-full pl-4 pr-4  z-1000 text-white hover:bg-gray-500"
                                    >
                                        <i className="fa-solid fa-microphone text-white text-sm text-center"></i>
                                    </button>
                                </div>
                            </>
                        );
                        console.log("user joined");
                        console.log(peers);
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
                    }
                });

                socketRef.current.on("receiving returned signal", (payload) => {
                    const item = peersRef.current.find(
                        (p) => p.peerID === payload.id
                    );
                    console.log("receiving returned signal");
                    console.log(payload.signal);
                    item.peer.signal(payload.signal);
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

                socketRef.current.on("canvas", () => {
                    setIsCanvas(!isCanvas);
                });

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
            })
            .catch((error) => console.log(error));
    }, []);

    const handleToggleShareScreen = (userstream) => {
        !isSharing
            ? showShareScreen(userstream, peers, screenTrack)
            : hideShareScreen(userstream, peers, screenTrack);
    };

    return (
        <>
            <div class="h-full">
                <div className="py-12 bg-gray-900">
                    <div className="flex flex-col h-full w-full justify-center items-center">
                        <div
                            className={
                                !isCanvas
                                    ? "flex w-[95%] h-[750px]  overflow-y mx-auto  pt-10  overflow-auto"
                                    : "flex w-full h-[750px]  overflow-y  pt-10  overflow-auto"
                            }
                        >
                            {isCanvas && <Canvas socket={socketRef.current} />}
                            <div
                                className={
                                    !isCanvas
                                        ? "grid grid-cols-2 gap-4"
                                        : "grid grid-cols-1"
                                }
                            >
                                <video
                                    className={
                                        !isCanvas
                                            ? "w-[100%] h-[650px]"
                                            : "w-[300px] h-[100px]"
                                    }
                                    controls
                                    playsInline
                                    ref={userVideo}
                                    autoPlay
                                />
                                {peers.map((peer, index) => {
                                    return (
                                        <>
                                            <div className="relative">
                                                <Video
                                                    isCanvas={isCanvas}
                                                    key={peer.peerID}
                                                    peer={peer.peer}
                                                />
                                                {!isCanvas &&
                                                    hideButtons.current[index]}
                                            </div>
                                        </>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="flex mt-10  justify-center">
                            <div
                                onClick={() => {
                                    handleToggleVideo(userStream.current);
                                    setIsVideo(!isVideo);
                                }}
                                className="flex mr-4 w-[75px] h-[75px] items-center justify-center group gap-6 overflow-hidden rounded-lg bg-gray-500 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300  hover:ring-black/40 hover:bg-[#FF216A]  dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 "
                            >
                                {isVideo ? (
                                    <i className="fa-solid fa-video text-xl text-white"></i>
                                ) : (
                                    <i className="fa-solid fa-video-slash text-xl text-white"></i>
                                )}
                            </div>
                            <div
                                onClick={() => {
                                    handleToggleAudio(userStream.current);
                                    setIsAudio(!isAudio);
                                }}
                                className="flex mr-4 w-[75px] h-[75px] items-center justify-center group gap-6 overflow-hidden rounded-lg bg-gray-500 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300  hover:ring-black/40 hover:bg-[#FF216A] focus:outline-none focus-visible:ring-[#FF2D20] dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                            >
                                {isAudio ? (
                                    <i className="fa-solid fa-microphone text-xl text-white"></i>
                                ) : (
                                    <i className="fa-solid fa-microphone-slash text-xl text-white"></i>
                                )}
                            </div>
                            <Link
                                href="/"
                                className="flex mr-4 w-[75px] h-[75px] items-center justify-center group gap-6 overflow-hidden rounded-lg bg-red-500 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300  hover:ring-black/40 hover:bg-[#FF216A] focus:outline-none focus-visible:ring-[#FF2D20] dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                                onClick={() => {
                                    console.log("disconnect");
                                    socketRef.current.emit("exit");
                                }}
                            >
                                <i className="fa-solid fa-phone text-xl text-white"></i>
                            </Link>
                            <div
                                onClick={() => {
                                    handleToggleShareScreen(userStream.current);
                                    setIsSharing(!isSharing);
                                }}
                                className="flex mr-4 w-[75px] h-[75px] items-center justify-center group gap-6 overflow-hidden rounded-lg bg-gray-500 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300  hover:ring-black/40 hover:bg-[#FF216A] focus:outline-none focus-visible:ring-[#FF2D20] dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                            >
                                <i className="fa-solid fa-desktop text-white"></i>
                            </div>
                            <div
                                className="flex mr-4 w-[75px] h-[75px] items-center justify-center group gap-6 overflow-hidden rounded-lg bg-gray-500 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300  hover:ring-black/40 hover:bg-[#FF216A] focus:outline-none focus-visible:ring-[#FF2D20] dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                                onClick={() => {
                                    setCopied(true);
                                    copyURL();
                                }}
                            >
                                <i className="fa-solid fa-link text-xl text-white"></i>
                            </div>
                            <div
                                className="flex mr-4 cursor-pointer w-[75px] h-[75px] items-center justify-center group gap-6 border-1 rounded-[9px] bg-gray-500 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)]    hover:bg-[#FF216A]  ring-1 ring-white/[0.05] transition duration-300  hover:ring-black/40 focus:outline-none focus-visible:ring-[#FF2D20] dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20] "
                                onClick={() => {
                                    console.log(isCanvas);
                                    setIsCanvas(!isCanvas);
                                    socketRef.current.emit("start canvas");
                                }}
                            >
                                <i className="fa-solid fa-paintbrush text-xl text-white"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
