import Image from "next/image";
import Link from "next/link";


const Credits = ({ array, id, image }: CreditsProps) => {
  return (
    <Link
      href={`/actors/${id[0]}`}
      className="flex items-center gap-x-3 rounded-lg p-3 hover:bg-muted lg:-translate-x-3"
    >
      <Image
        src={
          image[0] !== null
            ? `https://image.tmdb.org/t/p/w500/${image[0]}`
            : "https://placehold.co/50x50?text=No+image"
        }
        alt={array[0]}
        width={50}
        height={50}
        className="aspect-square rounded-md object-cover"
      />
      <span>{array[0]}</span>
    </Link>
  );
};
export default Credits;
