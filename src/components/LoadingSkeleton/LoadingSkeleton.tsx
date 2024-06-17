type LoadingSkeletonProps = {
  amountItems: number;
};

const LoadingSkeleton = ({ amountItems }: LoadingSkeletonProps) => {
  return (
    <div className="w-full">
      <ul className="mt-4 grid grid-cols-1 gap-5">
        {Array.from({ length: amountItems }).map((_, index) => (
          <li
            key={index}
            className="w-full space-y-3 rounded-md border-2 border-border p-4"
          >
            <div className="flex items-center justify-between space-x-2">
              <div className="h-10 w-full max-w-sm animate-pulse rounded-md bg-[#ccc]" />
              <div className="h-10 w-10 animate-pulse rounded-md bg-[#ccc]" />
            </div>

            <div className="h-10 w-full max-w-xs animate-pulse rounded-md bg-[#ccc]" />

            <div className="border-b border-[#ccc] opacity-25" />

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3">
              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className="h-8 w-full animate-pulse rounded-full bg-[#ccc]"
                />
              ))}
            </div>

            <div className="border-b border-[#ccc] opacity-25" />

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3">
              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className="h-8 w-full animate-pulse rounded-full bg-[#ccc]"
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { LoadingSkeleton };
