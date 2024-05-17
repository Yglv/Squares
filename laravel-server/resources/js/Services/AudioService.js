export function handleToggleAudio(stream) {
    try {
        console.log(stream);
        const audioTrack = stream
            .getTracks()
            .find((track) => track.kind === "audio");
        audioTrack.enabled = !audioTrack.enabled;
    } catch (err){
        console.log(err);
    }

};

export function handleToggleRemoteAudio (e, socket) {
    try {
        if (e.target.getAttribute("data-audio") === "hide") {
            e.target.setAttribute("data-audio", "show");
            socket.emit(
                "hide remote audio",
                e.target.getAttribute("data-id")
            );
        } else {
            e.target.setAttribute("data-audio", "hide");
            socket.emit(
                "show remote audio",
                e.target.getAttribute("data-id")
            );
        }
    } catch (err){
        console.log(err);
    }

};

export function hideAudio(stream) {
    const videoTrack = stream
        .getTracks()
        .find((track) => track.kind === "audio");
    videoTrack.enabled = false;
}

export function showAudio(stream) {
    const videoTrack = stream
        .getTracks()
        .find((track) => track.kind === "audio");
    videoTrack.enabled = true;
}
