"use client";

import PersonList from "@/components/PersonList";
import { useGetMovieQuery } from "@/services/TMDB";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import CreditsCollapsible from "@/components/Collapsible";
import Credits from "@/components/Credits";

const FullCredits = () => {
  const { id } = useParams();
  // @ts-ignore
  const { data, isFetching, error }: MovieQueryProps =
    useGetMovieQuery(id as unknown as number);

  if (isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <Link href={"/"}>Something went wrong</Link>;
  }

  const { crew, cast } = data.credits;
  const directorArray = crew
    .filter(person => person.job === "Director")
    .map(dir => dir.name.toString());
  const directorImage = crew
    .filter(person => person.job === "Director")
    .map(dir => dir.profile_path);
  const directorId = crew
    .filter(person => person.job === "Director")
    .map(dir => dir.id);
  const writtenByArray = [
    ...new Set(
      crew
        .filter(person => person.known_for_department === "Writing")
        .map(person => person.name.toString())
    ),
  ];
  const writtenById = crew
    .filter(person => person.known_for_department === "Writing")
    .map(person => person.id);
  const writtenByImage = crew
    .filter(person => person.known_for_department === "Writing")
    .map(person => person.profile_path);

  return (
    <div className="flex-col">
      <div className="mx-auto flex flex-col items-center lg:flex-row lg:items-start lg:justify-around">
        <div className="flex space-x-4">
          <Image
            src={
              data.poster_path
                ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
                : "https://placehold.co/100x200?text=No+image"
            }
            alt={data.original_title}
            width={100}
            height={200}
            className="mb-8 h-20 w-14 rounded-md"
          />
          <div className="flex flex-col">
            <div className="flex items-baseline">
              <Link
                href={`/movie/${id}`}
                className="text-lg hover:underline lg:text-xl xl:text-2xl"
              >
                {data.title}
              </Link>
              <span className="ml-2 -translate-y-0.5 text-sm text-muted-foreground xl:text-base">
                ({data.release_date.split("-")[0]})
              </span>
            </div>
            <h3 className="my-2 text-2xl lg:text-3xl xl:text-4xl">
              Full Cast & Crew
            </h3>
          </div>
        </div>
        <div className="flex flex-col space-y-5 lg:flex-row lg:space-x-20 lg:space-y-0">
          {directorArray.length !== 0 && (
            <div>
              <p className="mb-2 text-xl">Directed by</p>
              <div>
                {directorArray.length > 1 ? (
                  <div>
                    <CreditsCollapsible
                      array={directorArray}
                      id={directorId}
                      image={directorImage}
                      title="directors"
                    />
                  </div>
                ) : (
                  <Credits
                    array={directorArray}
                    id={directorId}
                    image={directorImage}
                  />
                )}
              </div>
            </div>
          )}
          <div>
            {writtenByArray.length !== 0 && (
              <div>
                <p className="mb-2 text-xl">Writing credits</p>
                <div>
                  {writtenByArray.length > 1 ? (
                    <div>
                      <CreditsCollapsible
                        array={writtenByArray}
                        id={writtenById}
                        image={writtenByImage}
                        title="writers"
                      />
                    </div>
                  ) : (
                    <div>
                      <Credits
                        array={writtenByArray}
                        id={writtenById}
                        image={writtenByImage}
                      />
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center lg:justify-around">
        <div className="flex translate-x-10 flex-col sm:translate-x-14 md:translate-x-20 lg:translate-x-2 lg:flex-row">
          <PersonList person={cast} title={"Cast"} />
          <PersonList person={crew} title={"Crew"} />
        </div>
      </div>
    </div>
  );
};
export default FullCredits;
