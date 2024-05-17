export function handleToggleVideo(stream){
    try {
        console.log(stream);
        const videoTrack = stream
            .getTracks()
            .find((track) => track.kind === "video");
        videoTrack.enabled = !videoTrack.enabled;
    } catch(err){
        console.log(err)
    }

};

export function handleToggleRemoteVideo (e, socket){
    try{
        console.log('remote video');
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
    } catch {
        console.log(err);
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
