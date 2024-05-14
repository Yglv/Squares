import Peer from "simple-peer";

export function createPeer(userToSignal, callerID, stream, socket) {
    const peer = new Peer({
        initiator: true,
        trickle: false,
        stream,
    });
    peer.on("signal", (signal) => {
        socket.emit("sending signal", {
            userToSignal,
            callerID,
            signal,
        });
    });

    return peer;
}

export function addPeer(incomingSignal, callerID, stream, socket) {
    console.log(callerID);
    const peer = new Peer({
        initiator: false,
        trickle: false,
        stream,
    });

    peer.on("signal", (signal) => {
        socket.emit("returning signal", { signal, callerID });
    });

    peer.signal(incomingSignal);

    return peer;
}
