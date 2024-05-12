export default function Card(props) {
    return (
        <>
            <div className="relative w-full flex items-center justify-center gap-6 ">
                <div
                    id="docs-card-content"
                    className="flex items-center gap-6 lg:flex-col"
                >
                    <div
                        className={`flex p-10 shrink-0 items-center justify-center rounded-full ${props.background} sm:size-16`}
                    >
                        <i className={`${props.pin} text-white text-2xl`}></i>
                    </div>

                    <div className="pt-3 sm:pt-5 lg:pt-0">
                        <h2 className="text-2xl font-semibold text-black dark:text-white group-hover:text-white">
                            {props.title}
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
}
