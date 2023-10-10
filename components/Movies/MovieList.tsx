import MovieCard from "./MovieCard";

export type TMovie = {
  movie: {
    // adult: boolean;
    // backdrop_path: string;
    // genre_ids: number[];
    id: number;
    // original_language: string;
    // original_title: string;
    // overview: string;
    // popularity: number;
    poster_path: string;
    // release_date: string;
    title: string;
    // video: boolean;
    vote_average: number;
    // vote_count: number;
  };
};

type MoviesProps = {
  movies: {
    page: number;
    results: [];
  };
};

const MovieList = ({ movies }: MoviesProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {movies.results.map((movie, i) => (
        <MovieCard key={i} movie={movie} />
      ))}
    </div>
  );
};
export default MovieList;
