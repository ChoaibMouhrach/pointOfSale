import { createSlice } from "@reduxjs/toolkit";

type InitialState = { value: "dark" | "light" };

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: localStorage.getItem("mode") === "dark" ? "dark" : "light",
  },
  reducers: {
    setTheme: (state, { payload }: { payload: "dark" | "light" }) => {
      state.value = payload;
    },
  },
});

export const getTheme = (state: { theme: { value: "dark" | "light" } }) => state.theme.value;
export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
