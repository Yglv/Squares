import axios from "axios";
import EditMeetupForm from "@/Components/Form/EditMeetupForm";
import { useState } from "react";

export default function MeetupCard(props) {
    const [open, setOpen] = useState(false);
    const removeHandler = (event) => {
        console.log("delete");
        event.preventDefault();
        axios.delete(`meetups/${props.data.id}`).then((res) => {
            console.log(res);
            window.location.reload();
        });
    };

    return (
        <>
            <div className="group flex cursor-pointer relative max-w-[600px] min-w-[350px] border-none w-full min-h-[140px] shadow-[0px_14px_34px_0px_rgba(0,0,0,0.08)] ring-1 ring-white/[0.05] border-2  rounded-[25px]   ">
                <div className="flex  justify-center flex-col  w-full h-full">
                    <div className="flex">
                        <div className="flex p-10 ml-4 mt-2 shrink-0 items-center justify-center rounded-full bg-[#00BFFF] sm:size-16">
                            <i className="fa-solid fa-phone text-white text-2xl"></i>
                        </div>
                        <div className="flex flex-col ml-16">
                            <p className="text-[34px] font-sans font-normal">
                                {props.data.future_meetup_title}
                            </p>
                            <p className="text-[34px] font-sans mt-[-5px]">
                                {props.data.future_meetup_date}
                            </p>
                        </div>
                        <form className="flex items-center ml-16">
                            <button
                                data-id={props.data.id}
                                onClick={(event) => removeHandler(event)}
                                className="w-12 h-12 rounded-full mr-6 pt-[12px] justify-center"
                            >
                                <i className="fa-solid fa-trash text-3xl hover:text-red-500"></i>
                            </button>
                            <div
                                data-id={props.data.id}
                                onClick={() => setOpen(true)}
                                className="w-12 h-12 rounded-full pt-[12px] justify-center "
                            >
                                <i className="fa-solid fa-pen text-3xl hover:text-green-500"></i>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <EditMeetupForm
                title={props.data.future_meetup_title}
                date={props.data.future_meetup_date}
                description={props.data.future_meetup_description}
                id={props.data.id}
                user_id={props.data.user_id}
                open={open}
                setOpen={setOpen}
            />
        </>
    );
}
