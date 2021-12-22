function TrackLoadingSkeleton({className}) {

    return (
        <div className={`${className} animate-pulse grid grid-cols-2 rounded-lg px-4 py-2 group`}>
            <div className="flex items-center space-x-4">
                <div>
                    <div className="w-7 h-4 bg-zinc-700 rounded-lg"/>
                </div>
                <div className="w-10 h-10 bg-zinc-500"/>
                <div>
                    <div className="w-24 lg:w-36 h-4 bg-zinc-500 rounded-lg my-2"/>
                    <div className="w-14 lg:w-20 h-4 bg-zinc-700 rounded-lg my-2"/>
                </div>
            </div>

            <div className="flex items-center justify-between ml-auto md:ml-0">
                <div className="w-40 h-4 bg-zinc-700 hidden md:inline rounded-lg"/>
                <div className="w-9 h-4 bg-zinc-700 rounded-lg"/>
            </div>
        </div>
    )
}

export default TrackLoadingSkeleton
