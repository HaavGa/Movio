import MovieCard from "./MovieCard";



const MovieList = ({ movies }: MoviesProps) => {
  console.log(movies);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {movies.results.map((movie, i) => (
        <MovieCard key={i} movie={movie} />
      ))}
    </div>
  );
};
export default MovieList;
