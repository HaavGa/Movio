"use client";

import Actors from "@/components/Actors";
import CreditsCollapsible from "@/components/Collapsible";
import Credits from "@/components/Credits";
import LoadingSpinner from "@/components/LoadingSpinner";
import MovieList from "@/components/Movies/MovieList";
import Rating from "@/components/Movies/Rating";
import { selectGenreOrCategory } from "@/features/currentGenreOrCategory";
import genreIcons from "@/public/genres";
import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from "@/services/TMDB";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import { IoMdArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";

const MovieInformation = () => {
  const [showText, setShowText] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  // @ts-ignore
  const { data, isFetching, error }: MovieQueryProps =
    useGetMovieQuery(id as unknown as number);

  // @ts-ignore
  const {
    data: recommendData,
    error: recommendError,
  }: RecommendMovieQueryProps = useGetRecommendationsQuery(
    id as unknown as number
  );

  if (isFetching) {
    return (
      <div className="flex h-full translate-y-[20rem] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <Link href={"/"}>Something went wrong</Link>;
  }

  const { crew } = data.credits;

  const directorArray = crew
    .filter(person => person.job === "Director")
    .map(dir => dir.name.toString());
  const directorImage = crew
    .filter(person => person.job === "Director")
    .map(dir => dir.profile_path);
  const directorId = crew
    .filter(person => person.job === "Director")
    .map(dir => dir.id);

  return (
    <>
      <div className="mx-2 flex flex-col items-center space-x-10 space-y-5 md:flex-row md:items-start md:justify-center lg:mx-5 lg:justify-around">
        <Image
          src={
            data.poster_path
              ? `https://image.tmdb.org/t/p/w500/${data.poster_path}`
              : "https://placehold.co/400x500?text=No+image"
          }
          alt={data.original_title}
          width={400}
          height={500}
          className="mb-8 h-[22rem] w-[15rem] rounded-3xl object-cover xl:h-[33rem] xl:w-[23rem]"
        />
        <div className="flex flex-col justify-center space-y-3 text-center">
          {data.title.length > 25 ? (
            <h3 className="text-3xl xl:text-4xl">
              {data.title} ({data.release_date.split("-")[0]})
            </h3>
          ) : (
            <h3 className="text-4xl xl:text-5xl">
              {data.title} ({data.release_date.split("-")[0]})
            </h3>
          )}
          {data.tagline && (
            <h3 className=" lg:text-xl">{data.tagline}</h3>
          )}
          <div className="flex flex-col items-center space-y-1 pt-2 xl:flex-row xl:justify-center xl:space-x-20 xl:space-y-0 xl:pt-5">
            <div className="flex space-x-2">
              <Rating rating={data.vote_average / 2} maxRating={5} />
              <span>{data.vote_average.toFixed(1)} / 10</span>
            </div>
            <p>
              {data.runtime} min /{" "}
              {data.spoken_languages.length > 0
                ? data.spoken_languages[0].english_name
                : ""}
            </p>
          </div>
          {data.genres.length > 3 ? (
            <div className="grid grid-cols-2 gap-5 pt-3 lg:grid-cols-3 xl:grid-cols-5">
              {data.genres.map((genre, i) => (
                <Link
                  href={`/?category=${genre.name}`}
                  onClick={() =>
                    dispatch(selectGenreOrCategory(genre.id))
                  }
                  key={i}
                  className="flex flex-col items-center gap-y-2 text-sm"
                >
                  <Image
                    src={
                      genreIcons[
                        genre.name.toLowerCase() as keyof typeof genreIcons
                      ]
                    }
                    alt={genre.name}
                    height={25}
                    width={25}
                    className="dark:invert"
                  />
                  {genre.name}
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex justify-center space-x-9 pt-3 lg:space-x-14">
              {data.genres.map((genre, i) => (
                <Link
                  href={`/?category=${genre.name}`}
                  onClick={() =>
                    dispatch(selectGenreOrCategory(genre.id))
                  }
                  key={i}
                  className="flex flex-col items-center gap-y-2"
                >
                  <Image
                    src={
                      genreIcons[
                        genre.name.toLowerCase() as keyof typeof genreIcons
                      ]
                    }
                    alt={genre.name}
                    height={25}
                    width={25}
                    className="dark:invert"
                  />
                  {genre.name}
                </Link>
              ))}
            </div>
          )}
          <div className="hidden flex-col pt-5 lg:flex">
            <h2 className="text-start text-2xl">Overview</h2>
            <div className="my-3 max-w-2xl text-start">
              {data.overview.length < 200 ? (
                data.overview
              ) : (
                <p className="leading-[18px]">
                  <>
                    {!showText && (
                      <>{data.overview.slice(0, 200)}... </>
                    )}
                    {showText && <>{data.overview} </>}
                    <span
                      className="cursor-pointer hover:underline"
                      onClick={() => {
                        setShowText(prevShowText => !prevShowText);
                      }}
                    >
                      Read {showText ? "less" : "more"}
                    </span>
                  </>
                </p>
              )}
            </div>
            {data.credits.cast.length > 0 && (
              <div>
                <div className="mb-3 space-y-3">
                  <h2 className="text-start text-xl">Directed by</h2>
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
                    <div className="max-w-fit">
                      <Credits
                        array={directorArray}
                        id={directorId}
                        image={directorImage}
                      />
                    </div>
                  )}
                </div>
                <div className="flex w-full justify-between gap-14">
                  <h2 className="text-start text-xl">Top Cast</h2>
                  {data.credits.cast.length > 6 && (
                    <Link
                      href={`/movie/${id}/fullcredits`}
                      className="group flex cursor-pointer items-center text-xl"
                    >
                      See full Cast & Crew
                      <span className="transition group-hover:translate-x-2">
                        <IoMdArrowForward size={25} />
                      </span>
                    </Link>
                  )}
                </div>
                <div className="flex h-full space-x-6 overflow-x-scroll md:max-w-[36rem] xl:max-w-[42rem]">
                  <Actors data={data} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start pt-5 lg:hidden">
        <h2 className="text-2xl">Overview</h2>
        <p className="my-3 max-w-2xl text-start">
          {data.overview.length < 200 ? (
            data.overview
          ) : (
            <p className="leading-[18px]">
              <>
                {!showText && <>{data.overview.slice(0, 200)}... </>}
                {showText && <>{data.overview} </>}
                <span
                  className="cursor-pointer hover:underline"
                  onClick={() => {
                    setShowText(prevShowText => !prevShowText);
                  }}
                >
                  Read {showText ? "less" : "more"}
                </span>
              </>
            </p>
          )}
        </p>
      </div>
      <div>
        <div className="flex w-full justify-between gap-14 lg:hidden">
          <h2 className="text-start text-xl">Top Cast</h2>
          {data.credits.cast.length > 6 && (
            <Link
              href={`/movie/${id}/fullcredits`}
              className="group flex cursor-pointer items-center text-xl"
            >
              See full Cast & Crew{" "}
              <span className="transition group-hover:translate-x-2">
                <IoMdArrowForward size={25} />
              </span>
            </Link>
          )}
        </div>
        <div className="flex space-x-6 overflow-x-scroll md:max-w-full lg:hidden">
          <Actors data={data} />
        </div>
        {recommendError && (
          <div className="grid h-32 place-content-center text-xl">
            Error fetching recommended movies!
          </div>
        )}
        {recommendData && recommendData.results.length > 0 && (
          <>
            <div className="my-2 flex flex-col items-center">
              <p className="animate-bounce">
                <BsChevronDown size={30} />
              </p>
              <h2 className="mb-5 mt-2 text-3xl">
                Recommended movies
              </h2>
            </div>
            <MovieList movies={recommendData} />
          </>
        )}
      </div>
    </>
  );
};
export default MovieInformation;
