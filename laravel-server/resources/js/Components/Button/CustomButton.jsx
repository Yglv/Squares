export default function CustomButton(props) {
    return (
        <button className="relative w-full flex items-center justify-center gap-6">
            <div className="flex items-center gap-6">
                <div
                    className={`flex p-10 shrink-0 items-center justify-center rounded-full ${props.background} sm:size-16`}
                >
                    <i className={`${props.pin} text-white text-2xl`}></i>
                </div>
                <span className="text-2xl font-semibold text-black dark:text-white group-hover:text-white">
                    {props.title}
                </span>
            </div>
        </button>
    );
}
