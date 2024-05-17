import { useEffect, useState } from "react";
import Board from "./Board";

export default function Canvas(props) {
    const [brushColor, setBrushColor] = useState("black");
    const [brushSize, setBrushSize] = useState(5);

    return (
        <div>
            <div className="flex">
                <Board
                    socket={props.socket}
                    brushColor={brushColor}
                    brushSize={brushSize}
                />
                <div className="tools">
                    <div>
                        <span className="text-white">Color: </span>
                        <input
                            type="color"
                            value={brushColor}
                            onChange={(e) => setBrushColor(e.target.value)}
                        />
                    </div>
                    <div>
                        <span className="text-white">Size: </span>
                        <input
                            type="range"
                            color="#fac176"
                            min="1"
                            max="100"
                            value={brushSize}
                            onChange={(e) =>
                                setBrushSize(Number(e.target.value))
                            }
                        />
                        <span>{brushSize}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
