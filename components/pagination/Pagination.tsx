import { cn } from "@/lib/utils";

const Pagination = ({
  currentPage,
  setPage,
  totalPages,
}: TPaginationProps) => {
  const handlePrev = () => {
    setPage(prev => prev - 1);
  };
  const handleNext = () => {
    setPage(prev => prev + 1);
  };

  const maxPages = 10;

  if (totalPages === 0) return null;

  const totalPagesArray = [];

  for (let i = 1; i <= totalPages; i++) {
    totalPagesArray.push(i);
  }

  return (
    <nav className="flex w-full justify-center">
      <ul className="inline-flex h-10 -space-x-px text-base">
        <li>
          <button
            className={cn(
              "ms-0 flex h-10 cursor-pointer items-center justify-center rounded-s-lg border border-e-0 border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
              currentPage === 1 &&
                "opacity-50 hover:cursor-not-allowed dark:hover:bg-gray-800 dark:hover:text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            )}
            disabled={currentPage === 1}
            onClick={handlePrev}
          >
            Previous
          </button>
        </li>
        {totalPagesArray.slice(0, maxPages).map(page => (
          <li key={page}>
            <a
              className={cn(
                "flex h-10 cursor-pointer items-center justify-center border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
                currentPage === page &&
                  `bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-white`
              )}
              onClick={() => setPage(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <li>
          <button
            className={cn(
              "flex h-10 cursor-pointer items-center justify-center rounded-e-lg border border-gray-300 bg-white px-4 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",
              currentPage === totalPages &&
                "opacity-50 hover:cursor-not-allowed dark:hover:bg-gray-800 dark:hover:text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            )}
            onClick={handleNext}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};
export default Pagination;
