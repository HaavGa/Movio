import { Skeleton } from "../ui/skeleton";

const GenreLoading = () => {
  return (
    <div>
      {new Array(19).fill("").map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-6 py-2">
          <Skeleton className="h-[2rem] w-[2rem]" />
          <Skeleton className="h-[1rem] w-[7rem]" />
        </div>
      ))}
    </div>
  );
};
export default GenreLoading;
