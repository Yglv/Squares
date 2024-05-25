import Modal from "@/Components/Modal/Modal";
import { useState } from "react";
import { Link, Head } from "@inertiajs/react";
import axios from "axios";

export default function EditMeetupForm(props) {
    const [title, setTitle] = useState(props.title);
    const [date, setDate] = useState(props.date);
    const [description, setDescription] = useState(props.description);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(props.id);
        axios
            .patch(`meetups/${props.id}`, {
                title,
                date,
                description,
                user_id: props.user_id,
            })
            .then((res) => {
                console.log(res);
            })
            .catch(() => {
                window.location.reload();
            });
    };

    return (
        <>
            <Modal
                maxWidth="xl"
                show={props.open}
                onClose={() => props.setOpen(false)}
                title="Запланировать"
            >
                <div class="w-full p-10">
                    <form class="bg-white" onSubmit={handleSubmit}>
                        <div class="mb-4">
                            <label
                                class="block text-gray-700 text-sm font-bold mb-2"
                                for="username"
                            >
                                Название
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                onChange={(event) =>
                                    setTitle(event.target.value)
                                }
                                value={title}
                                placeholder="Введите название"
                            />
                        </div>
                        <div class="mb-4">
                            <label
                                class="block text-gray-700 text-sm font-bold mb-2"
                                for="username"
                            >
                                Дата
                            </label>
                            <input
                                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="date"
                                onChange={(event) =>
                                    setDate(event.target.value)
                                }
                                value={date}
                                placeholder="Введите дату"
                            />
                        </div>
                        <div class="mb-6">
                            <label
                                class="block text-gray-700 text-sm font-bold mb-2"
                                for="password"
                            >
                                Описание
                            </label>
                            <textarea
                                class="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="text"
                                placeholder="Введите описание"
                                value={description}
                                onChange={(event) =>
                                    setDescription(event.target.value)
                                }
                            />
                        </div>
                        <div class="flex items-center justify-between">
                            <button
                                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Изменить
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>
        </>
    );
}
