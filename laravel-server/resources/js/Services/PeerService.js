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
        console.log(`sending signal from ${callerID} to ${userToSignal}`);
        //console.log(userToSignal);
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
        console.log('returning signal');
        console.log(callerID);
        socket.emit("returning signal", { signal, callerID });
    });
    console.log(`incoming signal from ${callerID}`);
    console.log(incomingSignal);
    setTimeout(() => peer.signal(incomingSignal), 3000);
    return peer;
}
