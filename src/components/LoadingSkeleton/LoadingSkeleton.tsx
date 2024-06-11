type LoadingSkeletonProps = {
    amountItems: number
}

const LoadingSkeleton = ({ amountItems }: LoadingSkeletonProps) => {
    return (
        <div className="w-full">
            <ul className="grid grid-cols-1 gap-5 mt-4">
                {Array.from({length: amountItems,}).map((_, index) => (
                    <li key={index} className="p-4 w-full border-2 border-border rounded-md space-y-3">
                        <div className="flex justify-between items-center space-x-2">
                            <div className="animate-pulse h-10 bg-[#ccc] rounded-md w-full max-w-sm" />
                            <div className="animate-pulse h-10 bg-[#ccc] rounded-md w-10" />
                        </div>

                        <div className="animate-pulse h-10 bg-[#ccc] rounded-md w-full max-w-xs" />

                        <div className="border-b border-[#ccc] opacity-25"/>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-4 gap-4 mt-5">
                            {Array.from({length: 7}).map((_, index) => (
                                <div
                                    key={index}
                                    className="animate-pulse h-8 bg-[#ccc] rounded-full w-full"
                                />
                            ))}
                        </div>

                        <div className="border-b border-[#ccc] opacity-25"/>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-4 gap-4 mt-5">
                            {Array.from({length: 7}).map((_, index) => (
                                <div
                                    key={index}
                                    className="animate-pulse h-8 bg-[#ccc] rounded-full w-full"
                                />
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export { LoadingSkeleton }