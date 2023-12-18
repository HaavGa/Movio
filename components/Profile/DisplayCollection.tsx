import MovieCard from "@/components/Movies/MovieCard";
import CardsLoading from "@/components/Profile/CardsLoading";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

const DisplayCollection = ({
  displayCollection,
}: TDisplayCollection) => {
  const [collection, setCollection] = useState<TMovieCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFavorites = async () => {
      const supabase = createClientComponentClient();

      try {
        const { data, error } = await supabase
          .from(displayCollection)
          .select();

        if (data) {
          setCollection(data);
        }

        if (error) {
          console.error(error.message);
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching data:",
          (error as Error).message
        );
      } finally {
        setLoading(false);
      }
    };

    getFavorites();
  }, [displayCollection]);

  return (
    <div>
      {loading ? (
        <CardsLoading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {collection.map(movie => (
            <MovieCard
              key={movie.id}
              movie={movie}
              displayCollection={displayCollection}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayCollection;
