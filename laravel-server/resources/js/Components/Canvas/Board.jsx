import React, { useEffect, useRef, useState } from "react";

export default function Board(props) {
    const canvasRef = useRef(null);

    useEffect(() => {
        console.log(props.socket);
        props.socket.on("canvasImage", (data) => {
            const image = new Image();
            image.src = data;
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            image.onload = () => {
                ctx.drawImage(image, 0, 0);
            };
        });
    }, [props.socket]);

    useEffect(() => {
        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;
        const startDrawing = (e) => {
            isDrawing = true;

            console.log(`drawing started`, props.brushColor, props.brushSize);
            [lastX, lastY] = [e.offsetX, e.offsetY];
        };

        const draw = (e) => {
            if (!isDrawing) return;

            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (ctx) {
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
            }

            [lastX, lastY] = [e.offsetX, e.offsetY];
        };

        const endDrawing = () => {
            const canvas = canvasRef.current;
            const dataURL = canvas.toDataURL();
            props.socket.emit("canvasImage", dataURL);
            console.log("drawing ended");
            isDrawing = false;
        };

        const canvas = canvasRef.current;
        const ctx = canvasRef.current?.getContext("2d");

        if (props.isClear) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            props.setIsClear(false);
        }

        if (props.isDownload) {
            let dataURL = canvas.toDataURL("image/jpeg");
            let a = document.createElement("a");
            a.href = dataURL;
            a.download = "canvas-download.jpeg";
            a.click();
            props.setIsDownload(false);
        }

        const loadImage = (src) => {
            let img = new Image();
            img.onload = function (e) {
                ctx.drawImage(img, 0, 0);
            };
            img.src = src;
        };

        if (ctx) {
            ctx.strokeStyle = props.brushColor;
            ctx.lineWidth = props.brushSize;

            ctx.lineCap = "round";
            ctx.lineJoin = "round";
        }
        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", endDrawing);
        canvas.addEventListener("mouseout", endDrawing);
        window.addEventListener("paste", function (e) {
            if (e.clipboardData == false) return false;
            let imgs = e.clipboardData.items;
            if (imgs == undefined) return false;
            for (var i = 0; i < imgs.length; i++) {
                if (imgs[i].type.indexOf("image") == -1) continue;
                let imgObj = imgs[i].getAsFile();
                let url = window.URL || window.webkitURL;
                let src = url.createObjectURL(imgObj);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                loadImage(src);
            }
        });
        return () => {
            canvas.removeEventListener("mousedown", startDrawing);
            canvas.removeEventListener("mousemove", draw);
            canvas.removeEventListener("mouseup", endDrawing);
            canvas.removeEventListener("mouseout", endDrawing);
        };
    }, [
        props.brushColor,
        props.brushSize,
        props.socket,
        props.isClear,
        props.isDownload,
    ]);
    return (
        <canvas
            ref={canvasRef}
            className="my-0 mx-auto rounded-[15px] ml-5 mr-5"
            width={1500}
            height={700}
            style={{ backgroundColor: "white" }}
        />
    );
}
