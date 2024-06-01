import Modal from "@/Components/Modal/Modal";
import { useState } from "react";
import { Link, Head } from "@inertiajs/react";
import axios from "axios";
import MeetupCalendar from "@/Pages/MeetupCalendar/MeetupCalendar";

export default function CalendarForm(props) {
    return (
        <>
            <Modal
                maxWidth="3xl"
                show={props.open}
                onClose={() => props.setOpen(false)}
                title="Календарь"
            >
                <MeetupCalendar meetups={props.meetups} />
            </Modal>
        </>
    );
}
