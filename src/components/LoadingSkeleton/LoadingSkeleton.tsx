type LoadingSkeletonProps = {
    amountItems: number
}

const LoadingSkeleton = ({ amountItems }: LoadingSkeletonProps) => {
    return (
        <div className="w-full text-sm text-left rtl:text-right text-gray-300 dark:text-gray-200">
            <div className="animate-pulse">
                <div className="flex justify-between space-x-2">
                    <div className="space-y-2 w-full max-w-xs">
                        <div className="h-10 bg-[#ccc] rounded-md"/>
                    </div>

                    <div className="h-10 bg-[#ccc] rounded-md"/>
                </div>

                <ul className="grid grid-cols-1 gap-5 mt-4">
                    {Array.from({length: amountItems,}).map((_, index) => (
                        <li key={index} className="h-72 bg-[#ccc] rounded-md"/>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export { LoadingSkeleton }