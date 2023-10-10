"use client";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useGetActorQuery } from "@/services/TMDB";
import { differenceInYears, format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

const Actors = () => {
  const [showText, setShowText] = useState(false);
  const { id } = useParams();
  // @ts-ignore
  const { data, isFetching, error }: ActorQueryProps =
    useGetActorQuery(id as unknown as number);

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
  const { birthday, deathday, place_of_birth, biography } = data;

  const formattedBirthDay = format(
    new Date(birthday),
    "do MMMM yyyy"
  );
  const formattedDeathDay =
    deathday && format(new Date(deathday), "do MMMM yyyy");

  const calculateAge = (dob: string) => {
    const date = new Date(dob);
    const age = differenceInYears(new Date(), date);
    return age;
  };

  const getCountry = (str: string | null) => {
    if (str === null) return;
    const splitString = str.split(",");
    // Get the country part of the string
    const countryString = splitString[splitString.length - 1].trim();
    return countryString.toLowerCase();
  };

  const removeCountry = (str: string) => {
    if (!str.includes(",") || !str.includes(" ")) return str;
    const splitString = str.split(",");
    // Remove the last part (country)
    splitString.pop();
    // Join the remaining parts with a comma
    const result = splitString.join(",").trim();
    return result;
  };

  let country = getCountry(place_of_birth);
  // Noen verdier som må endres manuelt pga annerledes staving fra APIet, sikkert flere
  if (
    country === "usa" ||
    country === "u.s." ||
    country === "u.s" ||
    country === "united states"
  )
    country = "united-states-of-america";
  if (country === "england" || country === "uk")
    country = "united-kingdom";
  if (country === "new zealand") country = "new-zealand";
  if (country === "ussr [now ukraine]") country = "ukraine";
  if (country === "etiopia") country = "ethiopia";
  if (country === "gujarat") country = "india";
  if (country === "south africa") country = "south-africa";

  return (
    <>
      <div className="mx-2 flex flex-col items-center space-x-10 space-y-5 md:flex-row md:items-start md:justify-center lg:mx-10 lg:max-w-7xl">
        <Image
          src={
            data.profile_path
              ? `https://image.tmdb.org/t/p/w500/${data.profile_path}`
              : "https://placehold.co/400x500?text=No+image"
          }
          alt={data.name}
          width={400}
          height={500}
          className="mb-8 h-[22rem] w-[15rem] rounded-3xl object-cover lg:h-[27rem] lg:w-[19rem] xl:h-[33rem] xl:w-[23rem]"
        />
        <div className="flex flex-col justify-center space-y-3 text-center">
          <h3 className="text-4xl lg:text-5xl xl:text-6xl">
            {data.name}
          </h3>
          <div className="pt-3 text-start text-lg xl:text-xl">
            {place_of_birth && (
              <div className="flex items-center space-x-2">
                Place of birth:
                <Link
                  href={`https://wikipedia.org/wiki/${removeCountry(
                    place_of_birth
                  )}`}
                  target="_blank"
                  className="ml-2 text-muted-foreground hover:underline"
                >
                  {place_of_birth}
                </Link>
                <Image
                  src={`https://cdn.countryflags.com/thumbs/${country}/flag-800.png`}
                  alt={country || "no country"}
                  className="object-cover"
                  width={40}
                  height={10}
                />
              </div>
            )}
            {birthday && (
              <p>
                Born: {formattedBirthDay}
                {!deathday && (
                  <span>, {calculateAge(birthday)} years old</span>
                )}
              </p>
            )}
            {deathday && (
              <p>
                Died: {formattedDeathDay}, {calculateAge(birthday)}{" "}
                years old
              </p>
            )}
          </div>
          {biography && (
            <div className="hidden flex-col pt-5 lg:flex">
              <h2 className="text-start text-3xl">Biography</h2>
              <div className="my-3 max-w-2xl text-start">
                {biography.length < 200 ? (
                  biography
                ) : (
                  <p>
                    <>
                      {!showText && (
                        <>{biography.slice(0, 200)}... </>
                      )}
                      {showText && <>{biography} </>}
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
            </div>
          )}
        </div>
      </div>
      {biography && (
        <div className="flex flex-col items-start pt-5 lg:hidden">
          <h2 className="text-2xl">Biography</h2>
          <div className="my-3 max-w-2xl text-start">
            {biography.length < 200 ? (
              biography
            ) : (
              <p>
                <>
                  {!showText && <>{biography.slice(0, 200)}... </>}
                  {showText && <>{biography} </>}
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
        </div>
      )}
      <div className="w-full">
        <h2>Movies by actor</h2>
        <div className="h-4 w-full bg-red-300"></div>
      </div>
    </>
  );
};
export default Actors;
