import React from "react";
import { useTranslation } from "react-i18next";
import { debounce } from "../helpers/tableHelpers";
import Input from "./Input";

type SearchProps = {
  setSearch: React.Dispatch<React.SetStateAction<any>>;
};

const Search = ({ setSearch }: SearchProps) => {
  const { t } = useTranslation();
  const handleChange = debounce((value: string) => {
    setSearch(value);
  });

  return (
    <Input
      containerClassName="bg-white"
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e.target.value);
      }}
      placeholder={t("search") + "..."}
    />
  );
};

export default Search;
