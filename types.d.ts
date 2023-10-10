type GenerateMetadataProps = {
  params: { id: number };
};

type GenreArray = {
  id: number;
  name: string;
}[];

type Actor = {
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

type ActorQueryProps = {
  data: Actor;
  isFetching: boolean;
  error: boolean;
};

type MovieInfo = {
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
        credit_id: string;
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
        credit_id: string;
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

type MoviesProps = {
  movies: {
    page: number;
    results: MovieInfo[];
    total_pages: number;
    total_results: number;
  };
};

type MovieQueryProps = {
  data: MovieInfo;
  isFetching: boolean;
  error: boolean;
};

type QueryProps = {
  genreIdOrCategoryName: string | number;
  page: number;
  searchQuery: string;
};

type ActorsProps = {
  data: MovieInfo;
};

type Cast = MovieInfo["credits"]["cast"];
type Crew = MovieInfo["credits"]["crew"];

type PersonListProps = {
  person: Cast | Crew;
  title: string;
};

type CreditsCollapsibleProps = {
  image: string[];
  id: number[];
  array: string[];
  title: string;
};

type GenreProps = {
  id: number;
  name: string;
};

type CreditsProps = {
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
};

type RatingProps = {
  rating: number;
  maxRating: number;
};

type Data = {
  data: {
    success: boolean;
    expires_at: string;
    request_token: string;
  };
};
