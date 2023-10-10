"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { setUser } from "@/features/auth";
import { selectGenreOrCategory } from "@/features/currentGenreOrCategory";
import {
  cn,
  createSessionId,
  fetchToken,
  moviesApi,
} from "@/lib/utils";
import genreIcons from "@/public/genres";
import MovioBlue from "@/public/logos/movio-blue.png";
import MovioRed from "@/public/logos/movio-red.png";
import { RootState } from "@/redux/store";
import { useGetGenresQuery } from "@/services/TMDB";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { MdAccountCircle, MdMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ModeToggle from "./ModeToggle";
import GenreLoading from "./Movies/GenreLoading";
import Search from "./Search/Search";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

const Navbar = () => {
  // const { genreIdOrCategoryName } = useSelector(
  //   state => state.currentGenreOrCategory
  // );
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const { theme } = useTheme();
  const pathName = usePathname();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("request_token");
    const sessionIdFromLocalStorage =
      localStorage.getItem("session_id");
    const logInUser = async () => {
      try {
        if (token) {
          if (sessionIdFromLocalStorage) {
            const { data: userData } = await moviesApi.get(
              `/account?session_id=${sessionIdFromLocalStorage}`
            );
            dispatch(setUser(userData));
          } else {
            const sessionId = await createSessionId();
            const { data: userData } = await moviesApi.get(
              `/account?session_id=${sessionId}`
            );
            dispatch(setUser(userData));
          }
        }
      } catch (error) {
        console.log((error as Error).message);
      }
    };
    logInUser();
  }, [dispatch]);

  return (
    <div>
      <div className="fixed hidden h-full w-64 overflow-y-scroll border-r-2 bg-background sm:block">
        <div className="py-4">
          <Link
            href="/?category=Popular"
            onClick={() => {
              dispatch(selectGenreOrCategory("popular"));
            }}
          >
            <Image
              src={theme === "light" ? MovioBlue : MovioRed}
              width={180}
              height={25}
              alt="logo"
              className="mx-auto"
            />
          </Link>
          <Separator className="my-5" />
          <div className="flex flex-col">
            <h2 className="mb-3 px-6">Categories</h2>
            <ul>
              {categories.map(({ label, value }) => (
                <Link href={`/?category=${label}`} key={value}>
                  <li
                    className="flex cursor-pointer items-center gap-5 px-6 py-2 hover:bg-muted"
                    onClick={() =>
                      dispatch(selectGenreOrCategory(value))
                    }
                  >
                    <Image
                      src={
                        genreIcons[
                          label.toLowerCase() as keyof typeof genreIcons
                        ]
                      }
                      alt={label}
                      height={30}
                      width={30}
                      className="dark:invert"
                    />
                    {label}
                  </li>
                </Link>
              ))}
            </ul>
            <Separator className="my-3" />
            <h2 className="my-3 px-6">Genres</h2>
            <ul>
              {isFetching ? (
                <GenreLoading />
              ) : (
                data.genres.map(({ name, id }: GenreProps) => (
                  <Link href={`/?category=${name}`} key={id}>
                    <li
                      className="flex cursor-pointer items-center gap-5 px-6 py-2 hover:bg-muted"
                      onClick={() =>
                        dispatch(selectGenreOrCategory(id))
                      }
                    >
                      <Image
                        src={
                          genreIcons[
                            name.toLowerCase() as keyof typeof genreIcons
                          ]
                        }
                        alt={name}
                        height={30}
                        width={30}
                        className="dark:invert"
                      />
                      {name}
                    </li>
                  </Link>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-main-blue p-5 shadow-md dark:bg-main-red sm:pl-72">
        <div
          className={cn(
            "mt-2 flex h-fit items-start justify-between text-black sm:mt-0 sm:h-full sm:items-center",
            pathName !== "/" && "items-center h-full"
          )}
        >
          <div className="flex items-center sm:hidden">
            <Sheet>
              <SheetTrigger>
                <div className="rounded-full p-2 transition hover:bg-blue-600 dark:hover:bg-red-600">
                  <MdMenu className="text-xl text-white" />
                </div>
              </SheetTrigger>
              <SheetContent className="w-64 overflow-y-scroll p-0">
                <div className="py-4">
                  <SheetClose asChild>
                    <Link
                      href="/?category=Popular"
                      onClick={() => {
                        dispatch(selectGenreOrCategory("popular"));
                      }}
                    >
                      <Image
                        src={theme === "light" ? MovioBlue : MovioRed}
                        width={180}
                        height={25}
                        alt="logo"
                        className="mx-auto"
                      />
                    </Link>
                  </SheetClose>
                  <Separator className="my-5" />
                  <div className="flex flex-col">
                    <h2 className="mb-3 px-6">Categories</h2>
                    <ul>
                      {categories.map(({ label, value }) => (
                        <div key={value}>
                          <SheetClose asChild>
                            <Link
                              href={`/?category=${label}`}
                              onClick={() => {
                                dispatch(
                                  selectGenreOrCategory(value)
                                );
                              }}
                            >
                              <li className="flex cursor-pointer items-center gap-5 px-6 py-2 hover:bg-muted">
                                <Image
                                  src={
                                    genreIcons[
                                      label.toLowerCase() as keyof typeof genreIcons
                                    ]
                                  }
                                  alt={label}
                                  height={30}
                                  width={30}
                                  className="dark:invert"
                                />
                                {label}
                              </li>
                            </Link>
                          </SheetClose>
                        </div>
                      ))}
                    </ul>
                    <Separator className="my-3" />
                    <h2 className="my-3 px-6">Genres</h2>
                    <ul>
                      {isFetching ? (
                        <GenreLoading />
                      ) : (
                        data.genres.map(
                          ({ name, id }: GenreProps) => (
                            <li key={id}>
                              <SheetClose asChild>
                                <Link
                                  href={`/?category=${name}`}
                                  onClick={() => {
                                    dispatch(
                                      selectGenreOrCategory(id)
                                    );
                                  }}
                                  className="flex cursor-pointer items-center gap-5 px-6 py-2 hover:bg-muted"
                                >
                                  <Image
                                    src={
                                      genreIcons[
                                        name.toLowerCase() as keyof typeof genreIcons
                                      ]
                                    }
                                    alt={name}
                                    height={30}
                                    width={30}
                                    className="dark:invert"
                                  />
                                  {name}
                                </Link>
                              </SheetClose>
                            </li>
                          )
                        )
                      )}
                    </ul>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="rounded-full transition hover:bg-blue-600 dark:hover:bg-red-600">
            <ModeToggle />
          </div>
          {pathName === "/" && (
            <div className="hidden sm:flex">
              <Search />
            </div>
          )}
          <div>
            {!isAuthenticated ? (
              <>
                <Button
                  variant="ghost"
                  className=" text-base uppercase text-white"
                  onClick={fetchToken}
                >
                  Login &nbsp; <MdAccountCircle size={20} />
                </Button>
              </>
            ) : (
              <>
                <Link href={`/profile/${user.id}`}>
                  <Button
                    variant="ghost"
                    className=" text-base uppercase text-white"
                  >
                    <span className="mr-2 hidden text-sm sm:block">
                      My movies
                    </span>
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={
                          user.avatar.tmdb.avatar_path
                            ? `https://image.tmdb.org/t/p/w200${user.avatar.tmdb.avatar_path}`
                            : `https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}?s=200`
                        }
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="flex justify-center">
          {pathName === "/" && (
            <div className="w-48 sm:hidden">
              <Search />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Navbar;
