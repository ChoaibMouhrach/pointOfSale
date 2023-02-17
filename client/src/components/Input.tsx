import { useState } from 'react';

type InputProps = {
  placeholder?: string;
  name?: string;
  type?: string;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  error: string | undefined | false;
};

const Input = ({
  placeholder,
  name,
  type,
  handleChange,
  handleBlur,
  className,
  error,
}: InputProps) => {
  const [focused, setFocused] = useState<boolean>(false);

  return (
    <div
      className={`w-full border-2 dark:border-dark-gray flex flex-col dark:bg-dark-gray dark:text-light-gray bg-light-gray hover:text-white transition duration-300 text-primary rounded-md ${
        className ?? ''
      } ${focused ? 'dark:border-primary' : ''}`}
    >
      <input
        onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
          setFocused(false);
          if (handleBlur) handleBlur(event);
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          if (handleChange) handleChange(event);
        }}
        onFocus={() => setFocused(true)}
        name={name}
        className="p-3 outline-none  w-full bg-transparent"
        placeholder={`${placeholder ? `${placeholder}...` : ''}`}
        type={type ?? 'text'}
      />

      {error && <p className="px-3 py-2 text-danger">{error}</p>}
    </div>
  );
};

export default Input;
