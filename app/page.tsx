"use client";

import MovieCardLoading from "@/components/Movies/MovieCardLoading";
import MovieList from "@/components/Movies/MovieList";
import { RootState } from "@/redux/store";
import { useGetMoviesQuery } from "@/services/TMDB";
import { useState } from "react";
import { useSelector } from "react-redux";
const Movies = () => {
  const [page, setPage] = useState(1);

  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state: RootState) => state.currentGenreOrCategory
  );

  // @ts-ignore
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  if (isFetching) {
    return <MovieCardLoading />;
  }

  if (!data.results.length || data.results.length === 0) {
    return <p>No movies found!</p>;
  }

  if (error) {
    return <p>An error occured</p>;
  }

  return (
    <div>
      <MovieList movies={data} />
    </div>
  );
};
export default Movies;
