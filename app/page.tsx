"use client";

import MovieCardLoading from "@/components/Movies/MovieCardLoading";
import MovieList from "@/components/Movies/MovieList";
import Pagination from "@/components/pagination/Pagination";
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
    return (
      <p className="text-center text-4xl">
        <p>No movies found!</p>
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-4xl">
        <p>An error occured</p>
      </p>
    );
  }

  return (
    <div>
      <MovieList movies={data} />
      <Pagination
        currentPage={page}
        totalPages={data.total_pages}
        setPage={setPage}
      />
    </div>
  );
};
export default Movies;
