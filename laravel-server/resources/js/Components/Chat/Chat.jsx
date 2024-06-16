import React, { useEffect, useState } from "react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { FiSend } from "react-icons/fi";
import { GrEmoji } from "react-icons/gr";
import i18n from "@emoji-mart/data/i18n/ru.json";
import { useSpeechRecognition } from "react-speech-kit";

const languageOptions = [
    { label: "Cambodian", value: "km-KH" },
    { label: "Deutsch", value: "de-DE" },
    { label: "English", value: "en-AU" },
    { label: "Farsi", value: "fa-IR" },
    { label: "Français", value: "fr-FR" },
    { label: "Italiano", value: "it-IT" },
    { label: "普通话 (中国大陆) - Mandarin", value: "zh" },
    { label: "Portuguese", value: "pt-BR" },
    { label: "Español", value: "es-MX" },
    { label: "Svenska - Swedish", value: "sv-SE" },
    { label: "Русский", value: "ru-RU" },
];

const languageOptions2 = [{ label: "English", value: "en" }];

const Chat = ({ socket, setIsChat }) => {
    const [state, setState] = useState([]);
    const [message, setMessage] = useState("");
    const [lang, setLang] = useState("en-AU");
    const [lang2, setLang2] = useState("en");
    const [blocked, setBlocked] = useState(false);
    const [show, setShow] = useState(false);
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

        socket.on("translated text", (res) => {
            console.log(res);
            setMessage(res.text);
        });
    }, []);

    useEffect(() => {
        setMessageData({
            message: message,
            id: socket.id,
        });
    }, [message]);

    const changeLang = (event) => {
        setLang(event.target.value);
    };

    const changeLang2 = (event) => {
        setLang2(event.target.value);
    };

    const handleEmojiShow = () => {
        setShowEmoji(!showEmoji);
    };

    const handleEmojiSelect = (event) => {
        console.log(event.native);
        setMessage((message) => (message += event.native));
    };

    const onResult = (result) => {
        //setMessage(result);
    };

    const onError = (event) => {
        if (event.error === "not-allowed") {
            setBlocked(true);
        }
    };

    const onEnd = () => {
        console.log({ message: message, lang: lang2 });
        socket.emit("translate", { message: message, lang: lang2 });
    };

    const { listen, listening, stop, supported } = useSpeechRecognition({
        onResult,
        onEnd,
        onError,
    });

    const toggle = listening
        ? stop
        : () => {
              setBlocked(false);
              listen({ lang });
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
            <div className="flex w-full pl-2 justify-center mt-[70px] self-end outline-none focus:outline-none focus:border-none">
                <textarea
                    value={message}
                    type="text"
                    name="message"
                    placeholder="Отправить сообщение"
                    onChange={(event) => {
                        setMessage(event.target.value);
                    }}
                    autoComplete="off"
                    required
                    className="relative text-[18px] text-gray-500 focus:rounded-[15px] focus:ring-transparent rounded-[15px] pl-8 h-[45px] w-full "
                />
                <button
                    onClick={() => setShow(!show)}
                    className="absolute z-1000 left-4 flex mt-2"
                >
                    <i class="fa-solid fa-gear text-stone text-xl"></i>
                </button>
                <div className="absolute flex z-1000 left-[68%]">
                    <button
                        className=" flex items-center justify-center z-1000 left-0  text-stone-700 w-[45px] h-[45px] text-center rounded-[15px] hover:bg-blue-300  ml-[10px] text-[20px] self-center cursor-pointer  "
                        type="button"
                        onClick={handleEmojiShow}
                    >
                        <GrEmoji />
                    </button>
                    {showEmoji && (
                        <div className="absolute top-[-420px] left-[-300px]">
                            <Picker
                                data={data}
                                onEmojiSelect={(event) =>
                                    handleEmojiSelect(event)
                                }
                                emojiSize={20}
                                navPosition="top"
                                locale="ru"
                            />
                        </div>
                    )}
                    <button type="button" onClick={toggle}>
                        <i
                            class={
                                listening
                                    ? "fa-solid text-xl text-green-500 fa-microphone"
                                    : "fa-solid text-xl text-stone-700 fa-microphone"
                            }
                        ></i>
                    </button>
                    <button
                        className=" z-1000  bg-green-500 w-[45px] h-[45px]  text-center rounded-[15px] hover:bg-green-300  ml-[10px] text-[20px] self-center cursor-pointer  "
                        onClick={(event) => handleSend(event)}
                    >
                        <i class="fa-regular fa-paper-plane text-white text-xl"></i>
                    </button>
                </div>
            </div>
            {show && (
                <div className="absolute flex flex-col left-[5%] top-[79%] rounded-[15px] bg-white p-4 ">
                    <select
                        className="mb-4 rounded-[15px] focus:rounded-[15px]"
                        value={lang}
                        onChange={changeLang}
                    >
                        {languageOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <select
                        className="mb-2 rounded-[15px] focus:rounded-[15px]"
                        value={lang2}
                        onChange={changeLang2}
                    >
                        {languageOptions2.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
};

export default Chat;
