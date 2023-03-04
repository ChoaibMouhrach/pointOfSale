import React from "react";

type FormProps = {
  children: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};

const Form = ({ children, onSubmit }: FormProps) => {
  return (
    <form className="bg-white dark:bg-transparent p-4 rounded-md dark:p-0 dark:rounded-t-none" onSubmit={onSubmit}>
      {children}
    </form>
  );
};

export default Form;
