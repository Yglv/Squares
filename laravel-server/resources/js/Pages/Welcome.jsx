import { Link, Head } from "@inertiajs/react";
import img from "../../assets/logo.png";
import { v1 as uuid } from "uuid";
import { useState } from "react";
import Modal from "@/Components/Modal";
import UserMain from "@/Pages/UserMenu";
import UserLayout from "./UserLayout";
//import Modal from "./Modal";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    const [open, setOpen] = useState(false);
    const [roomId, setRoomId] = useState("");
    const [name, setName] = useState("");

    return <UserLayout auth={auth.user}></UserLayout>;
}
