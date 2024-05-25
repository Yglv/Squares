import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

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
            <video
                className={
                    !props.isCanvas
                        ? "w-[100%] h-[650px]"
                        : "w-[200px] h-[100px]"
                }
                controls
                playsInline
                autoPlay
                ref={ref}
            />
        </>
    );
}
