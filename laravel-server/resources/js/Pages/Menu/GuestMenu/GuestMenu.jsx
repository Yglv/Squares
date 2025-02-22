import { Link } from "@inertiajs/react";
import Card from "../../../Components/Card/Card";
import { useState } from "react";
import RoomEnterForm from "../../../Components/Form/RoomEnterForm";

export default function GuestMenu() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                <Link
                    href={route("login")}
                    id="docs-card"
                    className="flex flex-col group items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:bg-[#14C7C3]  focus:outline-none focus-visible:ring-[#FF2D20]  lg:pb-32 lg:pt-32 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                >
                    <Card
                        title="Войти"
                        pin="fa-solid fa-user"
                        background="bg-[#14C7C3]"
                    />
                </Link>

                <Link
                    href={route("register")}
                    className="flex flex-col group items-start gap-6 lg:pb-32 lg:pt-32 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:bg-[#FA650A] focus:outline-none focus-visible:ring-[#FF2D20]  dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                >
                    <Card
                        title="Зарегистрироваться"
                        pin="fa-solid fa-user-plus"
                        background="bg-[#FA650A]"
                    />
                </Link>

                <div
                    onClick={() => setOpen(true)}
                    className="flex cursor-pointer flex-col items-start group gap-6 lg:pb-32 lg:pt-32 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300   hover:bg-[#FF216A] focus:outline-none focus-visible:ring-[#FF2D20] dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                >
                    <Card
                        title="Подключиться"
                        pin="fa-solid fa-plus"
                        background="bg-[#FF216A]"
                    />
                </div>
            </div>
            <RoomEnterForm open={open} setOpen={setOpen} />
        </>
    );
}
