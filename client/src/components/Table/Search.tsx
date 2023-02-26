import React from "react";
import { useSearchParams } from "react-router-dom";
import { debounce } from "../../helpers/tableHelpers";

type SearchProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
};

const Search = ({ search, setSearch }: SearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateSearch = debounce((value: string) => {
    setSearch(value);
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      search: value,
    });
  });

  return (
    <div className="dark:bg-dark-gray dark:text-light-gray hover:bg-primary hover:text-white dark:hover:bg-primary transition duration-300 bg-white text-primary rounded-md mb-4 flex items-stretch">
      <input
        defaultValue={search}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          updateSearch(event.target.value);
        }}
        type="text"
        className="bg-transparent h-12 w-full outline-none p-3"
        placeholder="Search..."
      />
    </div>
  );
};

export default Search;
