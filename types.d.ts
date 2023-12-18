type TGenerateMetadataProps = {
  params: {
    id: number;
  };
};

type TGenreArray = {
  id: number;
  name: string;
}[];

type TName = {
  adult: boolean;
  also_known_as: string;
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: 0 | 1 | 2 | 3;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
};

type TNameQueryProps = {
  data: TName;
  isFetching: boolean;
  error: boolean;
};

type TMovieInfo = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  credits: {
    cast: [
      {
        adult: boolean;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string;
        cast_id: number;
        character: string;
        id: string;
        order: number;
      }
    ];
    crew: [
      {
        adult: boolean;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string;
        id: string;
        department: string;
        job: string;
      }
    ];
  };
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  // production_companies: Array(3) [ {…}, {…}, {…} ]
  // production_countries: Array [ {…} ]
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    }
  ];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  // videos: Object { results: (33) […] }
  vote_average: number;
  vote_count: number;
};

type TMoviesProps = {
  movies: {
    page: number;
    results: TMovieInfo[];
    total_pages: number;
    total_results: number;
  };
};

type TMovieQueryProps = {
  data: TMovieInfo;
  isFetching: boolean;
  error: boolean;
};

type TRecommendMovieQueryProps = {
  data: TMoviesProps["movies"];
  isFetching: boolean;
  error: boolean;
};

type TQueryProps = {
  genreIdOrCategoryName: string | number;
  page: number;
  searchQuery: string;
};

type TActorsProps = {
  data: TMovieInfo;
};

type TCast = TMovieInfo["credits"]["cast"];
type TCrew = TMovieInfo["credits"]["crew"];

type TPersonListProps = {
  person: TCast | TCrew;
  title: string;
};

type TCreditsCollapsibleProps = {
  image: string[];
  id: number[];
  array: string[];
  title: string;
};

type TGenreProps = {
  id: number;
  name: string;
};

type TCreditsProps = {
  array: string[];
  id: number[];
  image: string[];
};

type TMovie = {
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
  displayCollection?: string;
};

type TMovieCardProps = TMovie["movie"];

type TRatingProps = {
  rating: number;
  maxRating: number;
};

type TData = {
  data: {
    success: boolean;
    expires_at: string;
    request_token: string;
  };
};

type TPaginationProps = {
  currentPage: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
};

type TUser = {
  user?: {
    id: string;
    email: string;
    aud: string;
    factors: Factor[] | null;
    iat: number;
    iss: string;
    phone: string | number;
    role: string;
    session_id: string;
  };
};

type TDisplayCollection = {
  displayCollection: string;
};

type TParamsProps = {
  params: {
    id: string;
    displayCollection: string;
  };
};
