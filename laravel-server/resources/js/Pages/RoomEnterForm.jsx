import Modal from "@/Components/Modal";
import { useState } from "react";
import { Link, Head } from "@inertiajs/react";

export default function RoomEnterForm(props) {
    const [roomId, setRoomId] = useState("");
    const [name, setName] = useState("");
    return (
        <>
            <Modal
                maxWidth="xl"
                show={props.open}
                onClose={() => props.setOpen(false)}
            >
                <div class="w-full p-10">
                    <form class="bg-white" method="post">
                        <div class="mb-4">
                            <label
                                class="block text-gray-700 text-sm font-bold mb-2"
                                for="username"
                            >
                                Имя
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                value={name}
                                placeholder="Введите имя"
                            />
                        </div>
                        <div class="mb-6">
                            <label
                                class="block text-gray-700 text-sm font-bold mb-2"
                                for="password"
                            >
                                Номер комнаты
                            </label>
                            <input
                                class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="text"
                                placeholder="Введите номер комнаты"
                                value={roomId}
                                onChange={(event) =>
                                    setRoomId(event.target.value)
                                }
                            />
                        </div>
                        <div class="flex items-center justify-between">
                            <Link
                                href={`/room/${roomId}`}
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="button"
                            >
                                Перейти
                            </Link>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}
