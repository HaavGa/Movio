"use client";

import DisplayCollection from "@/components/Profile/DisplayCollection";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBookmark, FaHeart } from "react-icons/fa";
import { MdExitToApp } from "react-icons/md";

const Profile = () => {
  const [user, setUser] = useState<TUser>({});
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClientComponentClient();
      const { data } = await supabase.auth.getUser();
      setUser(data.user as TUser);
    };
    getUser();
  }, []);

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    const supabase = createClientComponentClient();
    window.location.href = "/";
    const { error } = await supabase.auth.signOut();
    if (error) {
      return toast({
        variant: "destructive",
        title: "Log out failed! Please try again",
        description: error.message,
      });
    }
    if (!error) {
      router.push("/login");
    }
  };
  return (
    <>
      <div className="mb-3 flex justify-between">
        <div>
          <h1 className="mb-3 text-xl lg:text-3xl">My profile</h1>
        </div>
        <Button
          variant={"outline"}
          className="uppercase"
          onClick={handleLogout}
        >
          Log out &nbsp; <MdExitToApp />
        </Button>
      </div>
      <h2 className="flex justify-center text-2xl">
        Your favorites
        <FaHeart className="ml-3 translate-y-1" />
      </h2>
      <div className="scale-90">
        <DisplayCollection displayCollection={"favorites"} />
      </div>
      <h2 className="flex justify-center text-2xl">
        Your watchlist
        <FaBookmark className="ml-3 translate-y-1" />
      </h2>
      <div className="scale-90">
        <DisplayCollection displayCollection={"watchlists"} />
      </div>
    </>
  );
};
export default Profile;
