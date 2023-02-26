import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

const LoaderFull = () => {
  return (
    <div className="h-screen flex items-center bg-primary text-white justify-center">
      <BiLoaderCircle className="animate-spin text-4xl" />
    </div>
  );
};

export default LoaderFull;
