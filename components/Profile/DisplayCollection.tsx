import LoadingSpinner from "@/components/LoadingSpinner";
import MovieCard from "@/components/Movies/MovieCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

const DisplayCollection = ({ sCollection }: TDisplayCollection) => {
  const [collection, setCollection] = useState<TMovieCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFavorites = async () => {
      const supabase = createClientComponentClient();

      try {
        const { data, error } = await supabase
          .from(sCollection)
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
  }, [sCollection]);

  return (
    <div>
      {loading ? (
        <div className="grid w-full place-items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {collection.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayCollection;
