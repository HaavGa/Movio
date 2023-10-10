import Image from "next/image";
import Link from "next/link";

const PersonList = ({ person, title }: PersonListProps) => {
  return (
    <div className="flex flex-col">
      <h2 className="my-3 ml-2 text-2xl">{title}</h2>
      {person.map((person, i) => (
        <div
          key={i}
          className="my-3 grid grid-cols-2 items-center gap-x-5 text-lg xl:text-xl"
        >
          <Link
            href={`/name/${person.id}`}
            className="flex items-center gap-x-3 rounded-lg p-3 hover:bg-muted"
          >
            <Image
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${person.profile_path}`
                  : "https://placehold.co/120x120?text=No+image"
              }
              alt={person.name}
              width={50}
              height={50}
              className="aspect-square rounded-md object-cover"
            />
            <span>
              {person.name.length > 30
                ? `${person.name.slice(0, 30)}...`
                : person.name}
            </span>
          </Link>
          {"character" in person ? (
            <div>
              {person.character.length > 30
                ? `${person.character.slice(0, 30)}...`
                : person.character}
            </div>
          ) : (
            <div>{person.known_for_department}</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PersonList;
