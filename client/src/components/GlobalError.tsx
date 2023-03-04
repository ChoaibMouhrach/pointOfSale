import React from "react";

type GlobalErrorProps = {
  global_message: string;
};

const GlobalError = ({ global_message }: GlobalErrorProps) => {
  return (
    <>{global_message && <div className="bg-danger w-full shadow-lg rounded-md flex items-center justify-center h-14 text-white">{global_message}</div>}</>
  );
};

export default GlobalError;
