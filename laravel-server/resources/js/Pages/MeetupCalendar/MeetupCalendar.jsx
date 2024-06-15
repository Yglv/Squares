import {
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isSameDay,
    isToday,
    startOfMonth,
    add,
} from "date-fns";
import clsx from "clsx";
import MeetupCard from "../Meetup/MeetupCard/MeetupCard";
import { useState, useEffect } from "react";
import { useDebugValue } from "react";

const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export default function MeetupCalendar({ meetups }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentMeetups, setCurrentMeetups] = useState([]);
    const [selectedDay, setSelectedDay] = useState();
    const firstDayOfMonth = startOfMonth(currentDate);
    const lastDayOfMonth = endOfMonth(currentDate);

    const daysInMonth = eachDayOfInterval({
        start: firstDayOfMonth,
        end: lastDayOfMonth,
    });

    const startingDayIndex = getDay(firstDayOfMonth);

    const getMonthName = (date) => {
        const months = [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
        ];
        return months[date.getMonth()];
    };

    const getPreviousMonth = () => {
        let firstDayNextMonth = add(currentDate, { months: -1 });
        setCurrentDate(firstDayNextMonth);
    };

    const getNextMonth = () => {
        let firstDayNextMonth = add(currentDate, { months: 1 });
        setCurrentDate(firstDayNextMonth);
    };

    useEffect(() => {
        setCurrentMeetups(
            meetups.filter((meetup) =>
                isSameDay(meetup.future_meetup_date, selectedDay)
            )
        );
    }, [selectedDay]);

    useEffect(() => {
        console.log(currentDate.getTime);
        console.log(daysInMonth);
    }, []);

    return (
        <>
            <div className="flex">
                <div className="container h-[700px] w-[60%] flex-start p-8">
                    <div className="flex mb-4 mx-auto my-0 w-[90%] justify-between">
                        <p className="text-center font-bold text-4xl pb-8">
                            {format(currentDate, getMonthName(currentDate))}
                        </p>
                        <div className="flex w-[8%] justify-between">
                            <button onClick={getPreviousMonth}>
                                <i class="fa-solid fa-circle-left text-4xl cursor-pointer"></i>
                            </button>
                            <button onClick={getNextMonth}>
                                <i class="fa-solid fa-circle-right text-4xl cursor-pointer"></i>
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-3">
                        {weekdays.map((day) => (
                            <div
                                className="font-bold text-lg text-center"
                                key={day}
                            >
                                {day}
                            </div>
                        ))}
                        {Array.from({ length: startingDayIndex }).map(
                            (_, index) => (
                                <div key={`empty - ${index}`}></div>
                            )
                        )}
                        {daysInMonth.map((day, index) => (
                            <div
                                key={index}
                                onClick={(event) => {
                                    event.stopPropagation;
                                    console.log(format(day, "yyyy-MM-dd"));
                                    setSelectedDay(format(day, "yyyy-MM-dd"));
                                }}
                                className={clsx(
                                    "text-center text-lg mb-4 h-[80px] rounded-md hover:bg-blue-500 hover:text-white cursor-pointer",
                                    {
                                        "bg-blue-500": isToday(day),
                                        "text-white": isToday(day),
                                    }
                                )}
                            >
                                {format(day, "d")}
                                {meetups.filter((meetup) =>
                                    isSameDay(meetup.future_meetup_date, day)
                                ).length !== 0 && (
                                    <div
                                        className={
                                            day.getTime() >= Date.now()
                                                ? "w-[20px] h-[20px] rounded-[100%] bg-green-500 mx-auto my-0"
                                                : "w-[20px] h-[20px] rounded-[100%] bg-red-500 mx-auto my-0"
                                        }
                                    ></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-12 md:mt-0 md:pl-14">
                    <h2 className="font-bold text-3xl pt-8  text-gray-900">
                        Запланированные встречи {selectedDay}
                    </h2>
                    <div className="mt-4 h-[600px] space-y-1 text-sm leading-6 overflow-y-auto text-gray-500">
                        {currentMeetups.length > 0 ? (
                            currentMeetups.map((meetup) => (
                                <MeetupCard
                                    data={meetup}
                                    width="w=[150px] h-[50px]"
                                    icon="text-2xl"
                                    text="text-[30px]"
                                    mt="mt-[5px]"
                                    key={meetup.title}
                                />
                            ))
                        ) : (
                            <p>Запланированных встреч нет</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
