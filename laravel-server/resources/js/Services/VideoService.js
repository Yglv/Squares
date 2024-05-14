export function handleToggleVideo(stream){
    console.log(stream);
    const videoTrack = stream
        .getTracks()
        .find((track) => track.kind === "video");
    videoTrack.enabled = !videoTrack.enabled;
};

export function handleToggleRemoteVideo (e, socket){
    if (e.target.getAttribute("data-video") === "hide") {
        e.target.setAttribute("data-video", "show");
        socket.emit(
            "hide remote cam",
            e.target.getAttribute("data-id")
        );
    } else {
        e.target.setAttribute("data-video", "hide");
        socket.emit(
            "show remote cam",
            e.target.getAttribute("data-id")
        );
    }
};

export function hideVideo(stream) {
    console.log(stream);
    console.log("hide");
    const videoTrack = stream
        .getTracks()
        .find((track) => track.kind === "video");
    videoTrack.enabled = false;
}

export function showVideo(stream) {
    const videoTrack = stream
        .getTracks()
        .find((track) => track.kind === "video");
    videoTrack.enabled = true;
}
