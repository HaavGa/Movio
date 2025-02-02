import { Skeleton } from "@/components/ui/skeleton";

const CardsLoading = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {new Array(5).fill("").map((_, i) => (
        <div
          key={i}
          className="mx-auto mb-5 flex flex-col items-center"
        >
          <Skeleton className="h-[20rem] w-[15rem] sm:h-[15rem] sm:w-[10rem]" />
          <Skeleton className="mt-5 h-5 w-36" />
          <Skeleton className="mt-5 h-5 w-44" />
        </div>
      ))}
    </div>
  );
};
export default CardsLoading;
