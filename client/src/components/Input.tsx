import React, { useState } from "react";

type InputProps = {
  placeholder?: string;
  name?: string;
  type?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string | undefined | false;
  defaultValue?: string | number;
  handleFocus?: () => void;
  rf?: React.MutableRefObject<any>;
};

const Input = ({
  placeholder,
  name,
  type,
  handleChange,
  handleBlur,
  className,
  error,
  defaultValue,
  handleFocus,
  rf,
}: InputProps) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <div
      className={`w-full border-2 dark:border-dark-gray flex flex-col dark:bg-dark-gray dark:text-light-gray bg-light-gray hover:text-white transition duration-300 text-primary rounded-md ${
        className ?? ""
      } ${focused ? "dark:border-primary" : ""}`}
    >
      <input
        ref={rf}
        onFocus={() => {
          if (handleFocus) handleFocus();
          setFocused(true);
        }}
        defaultValue={defaultValue}
        onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
          setFocused(false);
          if (handleBlur) handleBlur(event);
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (handleChange) handleChange(event);
        }}
        name={name}
        className="p-3 outline-none text-dark dark:text-white  w-full bg-transparent"
        placeholder={`${placeholder ? `${placeholder}...` : ""}`}
        type={type ?? "text"}
      />

      {error && <p className="px-3 py-2 text-danger">{error}</p>}
    </div>
  );
};

export default Input;
