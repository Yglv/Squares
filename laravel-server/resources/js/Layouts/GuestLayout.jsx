import ApplicationLogo from "@/Components/AppLogo/ApplicationLogo";
import { Link } from "@inertiajs/react";
import img from "../../assets/logo.png";

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 ">
            <div>
                <Link href="/">
                    <img
                        className="h-32 w-32  text-white  lg:text-[#FF2D20]"
                        viewBox="0 0 62 65"
                        src={img}
                    ></img>
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
