import { Link } from "@inertiajs/react";
import Modal from "./Modal";
import { v1 as uuid } from "uuid";
import Card from "./Card";
import { useState } from "react";
import RoomEnterForm from "./RoomEnterForm";

export default function AuthenticatedMenu() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                <Link
                    href={`/room/${uuid()}`}
                    id="docs-card"
                    className="flex flex-col group items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:bg-[#14C7C3]  hover:ring-black/40 focus:outline-none focus-visible:ring-[#FF2D20]  lg:pb-32 lg:pt-32 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                >
                    <Card
                        title="Начать встречу"
                        pin="fa-solid fa-video"
                        background="bg-[#14C7C3]"
                    />
                </Link>

                <div
                    onClick={() => setOpen(true)}
                    className="flex flex-col group items-start gap-6 lg:pb-32 lg:pt-32 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:bg-[#FA650A] hover:ring-black/40 focus:outline-none focus-visible:ring-[#FF2D20]  dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                >
                    <Card
                        title="Подключиться"
                        pin="fa-solid fa-plus"
                        background="bg-[#FA650A]"
                    />
                </div>

                <Link
                    href="https://laravel-news.com"
                    className="flex flex-col items-start group gap-6 lg:pb-32 lg:pt-32 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300  hover:ring-black/40 hover:bg-[#FF216A] focus:outline-none focus-visible:ring-[#FF2D20] dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                >
                    <Card
                        title="Запланировать встречу"
                        pin="fa-solid fa-calendar"
                        background="bg-[#FF216A]"
                    />
                </Link>
            </div>
            <RoomEnterForm open={open} setOpen={setOpen} />
        </>
    );
}
