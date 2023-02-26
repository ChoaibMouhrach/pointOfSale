import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import LoaderFull from "./components/Loaders/LoaderFull";
import { useGetUserProfileQuery } from "./features/apis/authApi";
import { setUser } from "./features/slices/userSlice";

const App = () => {
  const [skip, setSkip] = useState(true);
  const [loading, setLoading] = useState(true);
  const { data, isError, isSuccess } = useGetUserProfileQuery(undefined, {
    skip,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const authToken: string | null = localStorage.getItem("authToken");

    if (authToken) setSkip(false);
    else setLoading(false);
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data));
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
