import { Link, Head } from "@inertiajs/react";
import img from "../../assets/logo.png";
import GuestMenu from "../Pages/Menu/GuestMenu/GuestMenu";
import AuthenticatedMenu from "../Pages/Menu/AuthMenu/AuthMenu";

export default function Main(auth) {
    return (
        <>
            <Head title="Welcome" />
            <div className=" text-black/50 dark:bg-black dark:text-white/50">
                <div className="relative  flex flex-col items-center justify-center selection:bg-[#FF2D20] selection:text-white">
                    <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
                        <main className="mt-12">
                            {auth.auth.auth ? (
                                <AuthenticatedMenu></AuthenticatedMenu>
                            ) : (
                                <GuestMenu></GuestMenu>
                            )}
                        </main>
                        <footer className="py-16 text-center text-sm text-black dark:text-white/70"></footer>
                    </div>
                </div>
            </div>
            <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        </>
    );
}
