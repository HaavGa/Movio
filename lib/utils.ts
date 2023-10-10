import axios from "axios";
import { clsx, type ClassValue } from "clsx";
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

export const fetchToken = async () => {
  try {
    const { data }: Data = await moviesApi.get(
      "authentication/token/new"
    );
    const { request_token: token } = data;
    if (data.success) {
      localStorage.setItem("request_token", token);
      window.location.href = `http://themoviedb.org/authenticate/${token}?redirect_to=${window.location.origin}`;
    }
  } catch (error) {
    console.log("Sorry your token could not be created");
  }
};

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
