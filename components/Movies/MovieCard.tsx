import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CiBookmark, CiBookmarkRemove } from "react-icons/ci";
import { FaHeart, FaHeartBroken } from "react-icons/fa";
import Rating from "./Rating";

const MovieCard = ({
  movie: { title, poster_path, id, vote_average },
  displayCollection,
}: TMovie) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [userIdPath, setUserIdPath] = useState("");
  const pathName = usePathname();

  useEffect(() => {
    const regex = /^\/profile\/([a-f0-9-]+)$/;

    const match = regex.exec(pathName);

    // Check if there is a match
    if (match) {
      // Extract the captured id
      const id = match[1];

      setUserIdPath(`/profile/${id}`);
    }
  }, [pathName]);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  const handleDelete = async (
    id: number,
    displayCollection: string
  ) => {
    setIsLoading(true);
    const res = await fetch(`/api/${displayCollection}/${id}`, {
      method: "DELETE",
    });
    const json = await res.json();

    if (json.error) {
      console.log(json.error);
      setIsLoading(false);
    }
    if (!json.error) {
      router.refresh();
      router.push("/");
    }
  };

  return (
    <div
      onClick={() => router.push(`/movie/${id}`)}
      className="mx-auto mb-5 flex cursor-pointer flex-col items-center"
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
        {pathName === userIdPath && (
          <div onClick={e => e.stopPropagation()}>
            <Dialog>
              <DialogTrigger>
                <div className="absolute bottom-2 right-4">
                  {displayCollection === "watchlists" ? (
                    <div
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      className="inline-block transition"
                    >
                      {isHovering ? (
                        <CiBookmarkRemove className="text-4xl text-primary hover:text-white" />
                      ) : (
                        <CiBookmark className="text-4xl text-primary hover:text-white" />
                      )}
                    </div>
                  ) : (
                    <div
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      className="inline-block transition"
                    >
                      {isHovering ? (
                        <FaHeartBroken className="text-4xl text-primary hover:text-white" />
                      ) : (
                        <FaHeart className="text-4xl text-primary hover:text-white" />
                      )}
                    </div>
                  )}
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Remove {title}?</DialogTitle>
                  <DialogDescription>
                    This will remove {title} from your{" "}
                    {displayCollection === "watchlists"
                      ? "watchlist"
                      : displayCollection}
                    !
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={
                      (
                        displayCollection === "watchlists"
                          ? "watchlist"
                          : displayCollection
                      )
                        ? () => handleDelete(id, displayCollection!)
                        : () => handleDelete(id, displayCollection!)
                    }
                  >
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
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
    </div>
  );
};
export default MovieCard;
