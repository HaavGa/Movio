import { useSearchParams } from "next/navigation";
import MovieCard from "./MovieCard";

const MovieList = ({ movies }: MoviesProps) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  return (
    <div>
      <h2 className="-mt-1 mb-8 text-center text-5xl">{category}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {movies.results.map((movie, i) => (
          <MovieCard key={i} movie={movie} />
        ))}
      </div>
    </div>
  );
};
export default MovieList;
