import { auth } from "@/features/auth";
import { genreOrCategory } from "@/features/currentGenreOrCategory";
import { tmdbApi } from "@/services/TMDB";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreOrCategory.reducer,
    auth: auth.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
