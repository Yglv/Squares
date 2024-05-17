import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledVideo = styled.video`
    height: 80%;
    width: 90%;
`;

export default function Video(props) {
    const ref = useRef();
    console.log(props.peer);
    useEffect(() => {
        console.log("use effect");
        props.peer.on("stream", (stream) => {
            ref.current.srcObject = stream;
            console.log(stream);
        });
    }, []);

    return (
        <>
            <StyledVideo controls playsInline autoPlay ref={ref} />
        </>
    );
}
