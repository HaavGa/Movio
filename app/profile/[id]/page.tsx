"use client";

import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { MdExitToApp } from "react-icons/md";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const favoriteMovies = [];

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  return (
    <>
      <div className="flex justify-between">
        <div>
          <h1 className="mb-3 text-xl lg:text-3xl">My Profile</h1>
          <div className="space-y-3">
            <Image
              src={
                user.avatar.tmdb.avatar_path
                  ? `https://image.tmdb.org/t/p/w200${user.avatar.tmdb.avatar_path}`
                  : `https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}?s=200`
              }
              alt={user.username}
              width={50}
              height={50}
              className="h-32 w-32 rounded-full object-cover"
            />
            <h2 className="text-lg lg:text-2xl">
              {user.name ? (
                <>
                  {user.name} |{" "}
                  <span className="text-muted-foreground lg:text-xl">
                    {" "}
                    {user.username}
                  </span>
                </>
              ) : (
                <>{user.username}</>
              )}
            </h2>
          </div>
        </div>
        <Button
          variant={"outline"}
          className="uppercase"
          onClick={logout}
        >
          Log out &nbsp; <MdExitToApp />
        </Button>
      </div>
      <div className="text-xl">
        {!favoriteMovies.length ? (
          <p>Add some favorites</p>
        ) : (
          <p>FAVORITE</p>
        )}
      </div>
    </>
  );
};
export default Profile;
