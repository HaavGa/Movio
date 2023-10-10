import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import Link from "next/link";
import { TMovie } from "./MovieList";
import Rating from "./Rating";

const MovieCard = ({
  movie: { title, poster_path, id, vote_average },
}: TMovie) => {
  return (
    <Link
      href={`/movie/${id}`}
      className="mx-auto mb-5 flex flex-col items-center"
    >
      <div className="relative h-[20rem] w-[15rem] sm:h-[15rem] sm:w-[10rem]">
        <Image
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500/${poster_path}`
              : "https://placehold.co/200x300?text=No+image"
          }
          alt={title}
          fill
          className="rounded-xl transition hover:scale-105"
        />
      </div>
      <h1 className="mb-2 mt-5 w-52 truncate text-center text-2xl sm:text-xl">
        {title}
      </h1>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Rating rating={vote_average / 2} maxRating={5} />
          </TooltipTrigger>
          <TooltipContent className="h-fit w-fit text-lg">
            <p>{`${vote_average.toFixed(1)} of 10`}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Link>
  );
};
export default MovieCard;
