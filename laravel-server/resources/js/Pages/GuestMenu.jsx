import { Link } from "@inertiajs/react";

export default function GuestMenu() {
    return (
        <>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
                <Link
                    href={route("login")}
                    id="docs-card"
                    className="flex flex-col group items-start gap-6 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:bg-[#14C7C3]  hover:ring-black/40 focus:outline-none focus-visible:ring-[#FF2D20]  lg:pb-32 lg:pt-32 dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                >
                    <div className="relative w-full flex items-center justify-center gap-6 ">
                        <div
                            id="docs-card-content"
                            className="flex items-center gap-6 lg:flex-col"
                        >
                            <div className="flex p-10 shrink-0 items-center justify-center rounded-full bg-[#14C7C3] sm:size-16">
                                <i class="fa-solid fa-user text-white text-2xl"></i>
                            </div>

                            <div className="pt-3 sm:pt-5 lg:pt-0">
                                <h2 className="text-2xl font-semibold text-black dark:text-white group-hover:text-white">
                                    Войти
                                </h2>
                            </div>
                        </div>
                    </div>
                </Link>

                <Link
                    href={route("register")}
                    className="flex flex-col group items-start gap-6 lg:pb-32 lg:pt-32 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:bg-[#FA650A] hover:ring-black/40 focus:outline-none focus-visible:ring-[#FF2D20]  dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                >
                    <div className="relative w-full flex items-center justify-center gap-6 ">
                        <div
                            id="docs-card-content"
                            className="flex items-center gap-6 lg:flex-col"
                        >
                            <div className="flex p-10 shrink-0 items-center justify-center rounded-full bg-[#FA650A] sm:size-16">
                                <i class="fa-solid fa-user-plus text-white text-2xl"></i>
                            </div>

                            <div className="pt-8 sm:pt-5 lg:pt-0">
                                <h2 className="text-2xl font-semibold text-black dark:text-white group-hover:text-white">
                                    Зарегистрироваться
                                </h2>
                            </div>
                        </div>
                    </div>
                </Link>

                <Link className="flex flex-col items-start group gap-6 lg:pb-32 lg:pt-32 overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300  hover:ring-black/40 hover:bg-[#FF216A] focus:outline-none focus-visible:ring-[#FF2D20] dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]">
                    <div className="relative w-full flex items-center justify-center gap-6 ">
                        <div
                            id="docs-card-content"
                            className="flex items-center gap-6 lg:flex-col"
                        >
                            <div className="flex p-10 shrink-0 items-center justify-center rounded-full bg-[#FF216A] sm:size-16">
                                <i class="fa-solid fa-plus text-white text-2xl"></i>
                            </div>

                            <div className="pt-3 sm:pt-5 lg:pt-0">
                                <h2 className="text-2xl font-semibold text-black dark:text-white group-hover:text-white">
                                    Подключиться
                                </h2>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
}
