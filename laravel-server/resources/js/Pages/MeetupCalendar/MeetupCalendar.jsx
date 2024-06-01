import {
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isSameDay,
    isToday,
    startOfMonth,
} from "date-fns";
import clsx from "clsx";

const weekdays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export default function MeetupCalendar({ meetups }) {
    const currentDate = new Date();
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

    return (
        <>
            <div className="container mx-auto p-4">
                <div className="mb-4">
                    <p
                        className="text-center font-bold text-2
                    xl pb-8"
                    >
                        {format(currentDate, getMonthName(currentDate))}
                    </p>
                </div>
                <div className="grid grid-cols-7 gap-2">
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
                            className={clsx(
                                "text-center text-lg  h-[80px] rounded-md hover:bg-blue-500 hover:text-white cursor-pointer",
                                {
                                    "bg-blue-500": isToday(day),
                                    "text-white": isToday(day),
                                }
                            )}
                        >
                            {format(day, "d")}
                            {meetups
                                .filter((meetup) =>
                                    isSameDay(meetup.future_meetup_date, day)
                                )
                                .map((meetup) => (
                                    <div
                                        className="bg-green-400 rounded-xl text-white"
                                        key={meetup.future_meetup_title}
                                    >
                                        {meetup.future_meetup_title}
                                    </div>
                                ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
