import { Link } from "@inertiajs/react";
import Modal from "./Modal";
import { v1 as uuid } from "uuid";

export default function AuthenticatedMenu() {
    return (
        <>
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

                <Link
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
                </Link>

                <Link
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
                </Link>
            </div>
        </>
    );
}
