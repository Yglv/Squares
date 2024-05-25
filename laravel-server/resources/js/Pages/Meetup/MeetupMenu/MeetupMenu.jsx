import CustomButton from "@/Components/Button/CustomButton";
import MeetupList from "../MeetupList/MeetupList";
import { Link } from "@inertiajs/react";
import img from "../../../../assets/logo.png";
import AddMeetupForm from "@/Components/Form/AddMeetupForm";
import { useState } from "react";
import Header from "@/Layouts/Header";

export default function MeetupMenu({ meetups, auth }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="flex flex-col justify-center">
                <Header auth={auth} />
                <div>
                    <div className="flex mt-10 mx-auto w-[50%] justify-between">
                        <div className=" group cursor-pointer flex gap-6 w-[450px] h-[150px] p overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:bg-[#00FF7F] hover:ring-black/40 focus:outline-none focus-visible:ring-[#FF2D20]  dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]">
                            <CustomButton
                                title="Открыть календарь"
                                pin="fa-regular fa-calendar-days"
                                background="bg-[#00FF7F]"
                            />
                        </div>
                        <div
                            onClick={() => setOpen(true)}
                            className=" group flex cursor-pointer  gap-6 w-[450px] h-[150px] p overflow-hidden rounded-lg bg-white p-6 shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] transition duration-300 hover:bg-[#F4A460] hover:ring-black/40 focus:outline-none focus-visible:ring-[#FF2D20]  dark:bg-zinc-900 dark:ring-zinc-800 dark:hover:text-white/70 dark:hover:ring-zinc-700 dark:focus-visible:ring-[#FF2D20]"
                        >
                            <CustomButton
                                title="Добавить встречу"
                                pin="fa-solid fa-calendar-plus"
                                background="bg-[#F4A460]"
                            />
                        </div>
                    </div>
                    <div className="mt-20 w-[65%] mx-auto my-0">
                        {meetups.length ? (
                            <>
                                <p className="text-center text-5xl text-gray-400">
                                    Запланированные звонки
                                </p>
                                <MeetupList meetups={meetups} />
                            </>
                        ) : (
                            <p className="text-center text-6xl text-gray-400">
                                Запланированных звонков нет
                            </p>
                        )}
                    </div>
                </div>
            </div>
            <AddMeetupForm open={open} setOpen={setOpen} id={auth.user.id} />
        </>
    );
}
