import Image from "next/image";
import Link from "next/link";

const Actors = ({ data }: ActorsProps) => {
  const cast: Cast = data.credits.cast;
  return (
    <>
      {data &&
        cast.slice(0, 10).map(actor => (
          <Link href={`/actors/${actor.id}`} key={actor.name}>
            <div className="flex h-full w-32 flex-col items-center p-3 hover:bg-muted">
              <Image
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                    : "https://placehold.co/120x120?text=No+image"
                }
                alt={actor.name}
                width={120}
                height={120}
                className="aspect-square rounded-md object-cover"
              />
              <p className="my-1 whitespace-nowrap text-sm">
                {actor.name}
              </p>
              <p className=" whitespace-nowrap text-sm text-muted-foreground">
                {actor.character}
              </p>
            </div>
          </Link>
        ))}
    </>
  );
};
export default Actors;
