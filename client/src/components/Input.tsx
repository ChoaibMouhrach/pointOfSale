import { useState } from "react";

type InputProps = {
  type?: string;
  name?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  id?: string;
  inputClassName?: string;
  containerClassName?: string;
  errorClassName?: string;
  error?: string;
  value?: any;
  defaultValue?: any;
  placeholder?: string;
  rf?: React.RefObject<HTMLInputElement>;
  skelton?: boolean;
};

const Input = ({
  rf,
  type,
  name,
  onChange,
  errorClassName,
  onBlur,
  onFocus,
  containerClassName,
  id,
  inputClassName,
  error,
  value,
  defaultValue,
  placeholder,
  skelton,
}: InputProps) => {
  const [focused, setFocused] = useState(false);

  if (skelton) {
    return <div className="h-14 bg-gray-300 dark:bg-dark-gray rounded-md animate-pulse border-2 border-gray-300 dark:border-dark-gray"></div>;
  }

  return (
    <div
      className={`dark:bg-dark-gray bg-light-gray rounded-md border-2 transition duration-300  ${
        focused ? "border-primary" : "border-light-gray dark:border-dark-gray"
      } ${containerClassName} `}
    >
      <input
        ref={rf}
        value={value}
        defaultValue={defaultValue}
        name={name}
        id={id}
        onChange={onChange}
        onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
          setFocused(false);
          if (onBlur) onBlur(event);
        }}
        onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
          setFocused(true);
          if (onFocus) onFocus(event);
        }}
        type={type ?? "text"}
        placeholder={placeholder}
        className={`px-3 h-14 w-full bg-transparent outline-none ${inputClassName} `}
      />
      {error && <div className={`p-3 text-danger ${errorClassName} `}>{error}</div>}
    </div>
  );
};

export default Input;
