import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_KEY;

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: builder => ({
    //* Get Genres
    getGenres: builder.query<any, void>({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    //* Get movies by [Type]
    getMovies: builder.query({
      query: ({
        genreIdOrCategoryName,
        page,
        searchQuery,
      }: QueryProps) => {
        // * Get movies by Search
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }
        // * Get movies by Category
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }
        // * Get movies by Genre
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }

        // * Get Popular Movies
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),
    // * Get Movie
    getMovie: builder.query({
      query: (id: number) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),
    // * Get Actor
    getActor: builder.query({
      query: (id: number) => `person/${id}?api_key=${tmdbApiKey}`,
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
  useGetMovieQuery,
  useGetActorQuery,
} = tmdbApi;
