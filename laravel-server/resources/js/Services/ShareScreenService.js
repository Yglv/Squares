export function showShareScreen(userstream, peers, screenTrack) {
    navigator.mediaDevices
        .getDisplayMedia({ cursor: true, audio: true })
        .then((stream) => {
            const videoTrack = userstream
                .getTracks()
                .find((track) => track.kind === "video");
            screenTrack.current = stream.getTracks()[0];
            userstream.removeTrack(videoTrack);
            userstream.addTrack(screenTrack.current);
            peers.map((peer) => {
                console.log(peer);
                peer.peer.replaceTrack(
                    videoTrack,
                    screenTrack.current,
                    userstream
                );
            });
        });
}

export function hideShareScreen(userstream, peers, screenTrack) {
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
            console.log("videotrack");
            console.log(stream.getTracks());
            const videoTrack = stream
                .getTracks()
                .find((track) => track.kind === "video");
            userstream.removeTrack(screenTrack.current);
            userstream.addTrack(videoTrack);
            peers.map((peer) => {
                console.log(peer);
                peer.peer.replaceTrack(
                    screenTrack.current,
                    videoTrack,
                    userstream
                );
            });
        });
}
