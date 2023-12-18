import MovieCard from "@/components/Movies/MovieCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

const DisplayWatchlist = () => {
  const [collection, setCollection] = useState<TMovieCardProps[]>([]);

  useEffect(() => {
    const getWatchlist = async () => {
      // Initialize Supabase client
      const supabase = createClientComponentClient();

      // Fetch data from the "watchlist" table
      const { data, error } = await supabase
        .from("watchlists")
        .select();

      // Set the fetched data to the state
      if (data) {
        setCollection(data);
        console.log(data);
      }

      // Handle errors
      if (error) {
        console.error(error.message);
      }
    };
    getWatchlist();
  }, []);

  console.log(collection);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {collection.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default DisplayWatchlist;
