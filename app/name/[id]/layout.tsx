const tmdbApiKey = process.env.NEXT_PUBLIC_TMDB_KEY;

export const generateMetadata = async ({
  params: { id },
}: TGenerateMetadataProps) => {
  // fetch data
  const fetchData = async () => {
    const response = await fetch(`
    https://api.themoviedb.org/3/person/${id}?api_key=${tmdbApiKey}
    `);
    const data: TName = await response.json();
    return data;
  };
  const data = await fetchData();

  return {
    title: `Movio | ${data.name}`,
  };
};

const NameLayout = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

export default NameLayout;
