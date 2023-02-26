import React from "react";

type TitleProps = {
  title: string;
};

const Title = ({ title }: TitleProps) => (
  <div className="h-16 flex items-center">
    <h1 className="text-2xl font-semibold">{title}</h1>
  </div>
);

export default Title;
