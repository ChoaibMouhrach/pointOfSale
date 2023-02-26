import React from "react";

type ButtonProps = {
  content: React.ReactNode;
  type?: "button" | "submit";
  variation?: "success" | "error" | "default";
  className?: string;
  handleClick?: () => void;
  disabled?: boolean;
};

const Button = ({
  className,
  disabled,
  handleClick,
  content,
  type,
  variation,
}: ButtonProps) => {
  let theme = "bg-primary hover:bg-light-primary";
  const color = "text-white";

  switch (variation) {
    case "error":
      theme = "bg-danger hover:bg-light-danger";
      break;
    case "success":
      theme = "bg-success hover:bg-light-success";
      break;
  }

  return (
    <button
      className={`w-full py-2 px-4 rounded-md flex items-center justify-center h-12 ${theme} ${color} ${
        className ?? ""
      }`}
      disabled={disabled}
      type={type ?? "submit"}
      onClick={handleClick}
    >
      {content}
    </button>
  );
};

export default Button;
