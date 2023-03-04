import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import LoaderFull from "./components/Loaders/LoaderFull";
import { useGetUserProfileQuery } from "./features/apis/authApi";
import { setUser } from "./features/slices/userSlice";
import { setTheme } from "./features/slices/themeSlice";
import { useGetSettingsQuery } from "./features/apis/settingsApi";
import { setSettings } from "./features/slices/settingsSlice";

const App = () => {
  const [skip, setSkip] = useState(true);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { data: settings, isSuccess: isSettingsLoaded } = useGetSettingsQuery(undefined, { skip });
  const {
    data: user,
    isError,
    isSuccess,
  } = useGetUserProfileQuery(undefined, {
    skip,
  });

  useEffect(() => {
    const authToken: string | null = localStorage.getItem("authToken");

    if (authToken) setSkip(false);
    else setLoading(false);
  }, []);

  useEffect(() => {
    if (isSuccess && user && isSettingsLoaded) {
      dispatch(setUser(user));
      dispatch(setSettings(settings));
      setLoading(false);
    }

    if (isError) {
      setSkip(true);
      localStorage.removeItem("authToken");
      setLoading(false);
    }
  }, [isError, isSuccess]);

  return loading ? <LoaderFull /> : <Outlet />;
};

export default App;
