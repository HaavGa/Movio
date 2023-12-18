import { createSlice } from "@reduxjs/toolkit";

export const auth = createSlice({
  name: "user",
  initialState: {
    user: {
      avatar: {
        gravatar: { hash: "" },
        tmdb: { avatar_path: null },
      },
      id: 0,
      iso_639_1: "",
      iso_3166_1: "",
      name: "",
      include_adult: false,
      username: "",
    },
    isAuthenticated: false,
    sessionId: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.sessionId = localStorage.getItem("session")!!;

      localStorage.setItem("accountId", action.payload.id);
    },
  },
});

export const { setUser } = auth.actions;

export default auth.reducer;
