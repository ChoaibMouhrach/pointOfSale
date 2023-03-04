import { configureStore } from "@reduxjs/toolkit";
import api from "./apis/api";
import userSlice from "./slices/userSlice";
import themeSlice from "./slices/themeSlice";
import settingsSlice from "./slices/settingsSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    settings: settingsSlice,
    theme: themeSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

export default store;
