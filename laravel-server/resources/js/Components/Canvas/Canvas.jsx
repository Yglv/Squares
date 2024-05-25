import { useEffect, useState } from "react";
import Board from "./Board";
import "./Canvas.css";

export default function Canvas(props) {
    const [brushColor, setBrushColor] = useState("#0000FF");
    const [brushSize, setBrushSize] = useState(5);
    const [isClear, setIsClear] = useState(false);
    const [isDownload, setIsDownload] = useState(false);

    return (
        <div>
            <div className="flex ">
                <div className="tools">
                    <div className="flex justify-center items-center rounded-lg p-2 flex-col shadow-[1em_1em_1em_0px_rgba(0,0,0,0.1)] bg-white mb-6">
                        <input
                            type="color"
                            id="color"
                            value={brushColor}
                            onChange={(e) => setBrushColor(e.target.value)}
                        />
                        <div>
                            <p className="text-md font-bold">Цвет</p>
                        </div>
                    </div>
                    <div className="flex justify-center items-center rounded-lg p-2 mb-6 flex-col shadow-[1em_1em_1em_0px_rgba(0,0,0,0.1)] bg-white">
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
                        <p className="text-md font-bold">Размер: </p>
                        <span className="font-bold text-md">{brushSize}</span>
                    </div>
                    <div className="flex">
                        <div
                            className="flex cursor-pointer mr-4 w-[75px] h-[75px] items-center justify-center group gap-6 overflow-hidden rounded-lg bg-gray-500 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300  hover:ring-black/40 hover:bg-[#FF216A] focus:outline-none focus-visible:ring-[#FF2D20] dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                            onClick={() => setIsClear(true)}
                        >
                            <i className="fa-solid fa-broom text-xl text-white"></i>
                        </div>
                        <div
                            className="flex cursor-pointer mr-4 w-[75px] h-[75px] items-center justify-center group gap-6 overflow-hidden rounded-lg bg-gray-500 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300  hover:ring-black/40 hover:bg-[#FF216A] focus:outline-none focus-visible:ring-[#FF2D20] dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                            onClick={() => setIsDownload(true)}
                        >
                            <i className="fa-solid fa-download text-xl text-white"></i>
                        </div>
                    </div>
                </div>
                <Board
                    socket={props.socket}
                    brushColor={brushColor}
                    brushSize={brushSize}
                    isClear={isClear}
                    setIsClear={setIsClear}
                    isDownload={isDownload}
                    setIsDownload={setIsDownload}
                />
            </div>
        </div>
    );
}
