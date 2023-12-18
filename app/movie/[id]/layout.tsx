const tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_KEY;

export const generateMetadata = async ({
  params: { id },
}: TGenerateMetadataProps) => {
  // fetch data
  const fetchData = async () => {
    const response = await fetch(`
    https://api.themoviedb.org/3/movie/${id}?api_key=${tmdbApiKey}
    `);
    const data: TMovieInfo = await response.json();
    return data;
  };
  const data = await fetchData();

  return {
    title: `Movio | ${data.title}`,
  };
};

const MovieLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default MovieLayout;
