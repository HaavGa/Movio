import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { MouseEvent } from "react";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const moviesApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_KEY,
  },
});

export const createSessionId = async () => {
  const token = localStorage.getItem("request_token");

  try {
    if (token) {
      const {
        data: { session_id },
      } = await moviesApi.post("authentication/session/new", {
        request_token: token,
      });
      localStorage.setItem("session_id", session_id);
      return session_id;
    }
  } catch (error) {
    console.log((error as Error).message);
  }
};

export const handleAddToCollection = async (
  e: MouseEvent<HTMLButtonElement, MouseEvent>,
  collection: string,
  movie_id: string,
  poster_path: string,
  title: string,
  vote_average: number,
  router: AppRouterInstance
) => {
  e.preventDefault();

  const document = {
    id: movie_id,
    poster_path,
    title,
    vote_average,
  };
  console.log(`/api/${collection}`);
  const res = await fetch(`/api/${collection}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(document),
  });
  const json = await res.json();
  console.log(json);
  if (json.error) {
    return toast({
      variant: "destructive",
      title: `Could not add to ${collection}! Please try again`,
      description: json.error.message,
    });
  }
  if (json.data) {
    router.refresh();
    router.push("/");
  }
};
