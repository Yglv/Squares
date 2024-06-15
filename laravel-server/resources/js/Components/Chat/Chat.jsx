import React, { useEffect, useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { FiSend } from "react-icons/fi";
import { GrEmoji } from "react-icons/gr";
import i18n from "@emoji-mart/data/i18n/ru.json";

const Chat = ({ socket, setIsChat }) => {
    const [state, setState] = useState([]);
    const [message, setMessage] = useState("");
    const [messageData, setMessageData] = useState({ message: "", id: "" });
    const [showEmoji, setShowEmoji] = useState(false);

    const handleSend = (event) => {
        event.preventDefault();
        if (!message) return;

        socket.emit("send message", messageData);
        setState((state) => [...state, messageData]);
        setMessage("");
        setMessageData({ message: "", id: "" });
    };

    useEffect(() => {
        socket.on("message", (data) => {
            console.log(data);
            setState((state) => [...state, data]);
        });
    }, []);

    useEffect(() => {
        setMessageData({
            message: message,
            id: socket.id,
        });
    }, [message]);

    const handleEmojiShow = () => {
        setShowEmoji(!showEmoji);
    };

    const handleEmojiSelect = (event) => {
        console.log(event.native);
        setMessage((message) => (message += event.native));
    };

    return (
        <div className="absolute flex top-0 left-[80%] w-[380px] h-full bg-gray-800 flex-col items-around">
            <a
                onClick={() => setIsChat(false)}
                className="cursor-pointer text-white self-end p-4 hover:text-red-500"
            >
                &#9587;
            </a>
            <div className="h-[80%] overflow-y-auto">
                {state &&
                    state.map((item, index) => (
                        <div className="pt-[20px] flex">
                            {item.id === socket.id ? (
                                <p
                                    className=" ml-[50%] rounded-[15px] max-w-[130px]  break-words mt-[5px] bg-blue-500  text-white text-center w-fit h-fit pl-[10px] pr-[10px]  mb-[10px] "
                                    key={index}
                                >
                                    {item.message}
                                </p>
                            ) : (
                                <p
                                    className="rounded-[15px] mt-[5px]  max-w-[130px]  break-words bg-white w-fit text-center pl-[10px] pr-[10px] h-fit ml-[20px] mb-[10px] "
                                    key={item.message}
                                >
                                    {item.message}
                                </p>
                            )}
                        </div>
                    ))}
            </div>
            <form className="flex w-full pl-6 justify-center mt-[70px] self-end outline-none focus:outline-none focus:border-none">
                <input
                    value={message}
                    type="text"
                    name="message"
                    placeholder="Отправить сообщение"
                    onChange={(event) => {
                        setMessage(event.target.value);
                    }}
                    autoComplete="off"
                    required
                    className="relative text-[18px] text-gray-500 focus:rounded-[15px] focus:ring-transparent rounded-[15px] pl-4 h-[45px] w-[90%] "
                />
                <button
                    className="absolute z-1000 left-[82%] bg-green-500 w-[45px] h-[45px]  text-center rounded-[15px] hover:bg-green-300  ml-[10px] text-[20px] self-center cursor-pointer  "
                    onClick={(event) => handleSend(event)}
                >
                    <i class="fa-regular fa-paper-plane text-white text-xl"></i>
                </button>
                <button
                    className="absolute flex items-center justify-center z-1000 left-0 rounded-tr-[0px]  rounded-br-[0px] focus:rounded-[15px] focus:rounded-tr-[0px]  focus:rounded-br-[0px] bg-blue-500 text-white w-[45px] h-[45px] text-center rounded-[15px] hover:bg-blue-300  ml-[10px] text-[20px] self-center cursor-pointer  "
                    type="button"
                    onClick={handleEmojiShow}
                >
                    <GrEmoji />
                </button>
                {showEmoji && (
                    <Picker
                        data={data}
                        onEmojiSelect={(event) => handleEmojiSelect(event)}
                        emojiSize={20}
                        navPosition="top"
                        previewPosition="bottom"
                        locale="ru"
                    />
                )}
            </form>
        </div>
    );
};

export default Chat;
