import MeetupCard from "../MeetupCard/MeetupCard";
import { useEffect } from "react";

export default function MeetupList(props) {
    useEffect(() => {
        console.log(props.meetups);
    }, []);

    return (
        <>
            <div className="grid grid-cols-2   gap-y-[20px] gap-x-[70px] mt-[30px]">
                {props.meetups.map((meetup) => {
                    return <MeetupCard key={meetup.title} data={meetup} />;
                })}
            </div>
            ;
        </>
    );
}
