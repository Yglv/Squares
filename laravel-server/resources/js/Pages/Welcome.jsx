import { Link, Head } from "@inertiajs/react";
import img from "../../assets/logo.png";
import { v1 as uuid } from "uuid";
import { useState } from "react";
import Modal from "@/Components/Modal";
//import Modal from "./Modal";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    const [open, setOpen] = useState(false);
    const [roomId, setRoomId] = useState("");
    const [name, setName] = useState("");

    return (
        <>
            <Head title="Welcome" />
            <div className=" text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative  flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <header className="grid grid-cols-2 items-center gap-2 py-10 lg:grid-cols-3">
                            <div className="flex lg:justify-center lg:col-start-2">
                                <img
                                    className="h-32 w-32  text-white  lg:text-[#FF2D20]"
                                    viewBox="0 0 62 65"
                                    src={img}
                                ></img>
                            </div>
                            <nav className="-mx-3 flex flex-1 justify-end">
                                {auth.user ? (
                                    <Link className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white">
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route("login")}
                                            className="rounded-md px-3 text-xl mr-6 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Вход
                                        </Link>
                                        <Link
                                            href={route("register")}
                                            className="rounded-md px-3 text-xl py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                                        >
                                            Регистрация
                                        </Link>
                                    </>
                                )}
                            </nav>
                        </header>

                        <main className="mt-12">
                            <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                                <Link
                                    href={`/room/${uuid()}`}
                                    id="docs-card"
                                    className="flex flex-col group items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:bg-[#14C7C3]  hover:ring-black/40 focus:outline-none focus-visible:ring-[#FF2D20]  lg:pb-32 lg:pt-32 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                                >
                                    <div className="relative w-full flex items-center justify-center gap-6 ">
                                        <div
                                            id="docs-card-content"
                                            className="flex items-center gap-6 lg:flex-col"
                                        >
                                            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#14C7C3] sm:size-16">
                                                <i class="fa-solid fa-video text-white text-xl"></i>
                                            </div>

                                            <div className="pt-3 sm:pt-5 lg:pt-0">
                                                <h2 className="text-2xl font-semibold text-black dark:text-white group-hover:text-white">
                                                    Начать встречу
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <a
                                    onClick={() => setOpen(true)}
                                    className="flex flex-col group items-start gap-6 lg:pb-32 lg:pt-32 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:bg-[#FA650A] hover:ring-black/40 focus:outline-none focus-visible:ring-[#FF2D20]  dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                                >
                                    <div className="relative w-full flex items-center justify-center gap-6 ">
                                        <div
                                            id="docs-card-content"
                                            className="flex items-center gap-6 lg:flex-col"
                                        >
                                            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FA650A] sm:size-16">
                                                <i class="fa-solid fa-plus text-white text-xl"></i>
                                            </div>

                                            <div className="pt-3 sm:pt-5 lg:pt-0">
                                                <h2 className="text-2xl font-semibold text-black dark:text-white group-hover:text-white">
                                                    Подключиться
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <a
                                    href="https://laravel-news.com"
                                    className="flex flex-col items-start group gap-6 lg:pb-32 lg:pt-32 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300  hover:ring-black/40 hover:bg-[#FF216A] focus:outline-none focus-visible:ring-[#FF2D20] dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                                >
                                    <div className="relative w-full flex items-center justify-center gap-6 ">
                                        <div
                                            id="docs-card-content"
                                            className="flex items-center gap-6 lg:flex-col"
                                        >
                                            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-[#FF216A] sm:size-16">
                                                <i class="fa-solid fa-calendar text-white text-xl"></i>
                                            </div>

                                            <div className="pt-3 sm:pt-5 lg:pt-0">
                                                <h2 className="text-2xl font-semibold text-black dark:text-white group-hover:text-white">
                                                    Запланировать встречу
                                                </h2>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <Modal
                                maxWidth="xl"
                                show={open}
                                onClose={() => setOpen(false)}
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
                                                    setRoomId(
                                                        event.target.value
                                                    )
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
                        </main>
                        <footer className="py-16 text-center text-sm text-black dark:text-white/70"></footer>
                    </div>
                </div>
            </div>
            <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        </>
    );
}
