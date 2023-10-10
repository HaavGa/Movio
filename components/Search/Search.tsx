"use client";

import { searchMovie } from "@/features/currentGenreOrCategory";
import { KeyboardEvent, useState } from "react";
import { MdSearch } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Input } from "../ui/input";

const Search = () => {
  const dispatch = useDispatch();
  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      dispatch(searchMovie(query));
    }
  };
  const [query, setQuery] = useState("");
  return (
    <div className="relative w-full">
      <MdSearch
        className="absolute translate-x-2 translate-y-[11px] dark:text-muted-foreground"
        size={20}
      />
      <Input
        onKeyDown={handleKeyPress}
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="pl-8 dark:text-foreground"
      />
    </div>
  );
};
export default Search;
