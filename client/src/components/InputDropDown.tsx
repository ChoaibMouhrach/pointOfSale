import React, { useEffect, useRef, useState } from "react";
import Input from "./Input";

type Data = {
  id: number | string;
  name: number | string;
};

type InputDropDownProps = {
  data: Data[];
  handleChange: (value: string) => void;
  error?: string;
  defaultValue?: string | number;
  placeholder: string;
};

const InputDropDown = ({
  data,
  handleChange,
  error,
  defaultValue,
  placeholder,
}: InputDropDownProps) => {
  const [filteredData, setFilteredData] = useState(data);
  const container = useRef(null);
  const searchInput = useRef<HTMLInputElement | null>(null);
  const [search, setSearch] = useState(
    defaultValue ? String(defaultValue) : ""
  );
  const [open, setOpen] = useState<boolean>(false);
  const resultInput = useRef<HTMLInputElement>(null);

  function handleClick({ id, name }: Data) {
    if (searchInput.current) {
      searchInput.current.value = String(name);
      setSearch(String(name));
      if (resultInput.current) {
        resultInput.current.value = String(id);
        handleChange(String(id));
      }
    }
  }

  useEffect(() => {
    setFilteredData(
      data.filter((data: Data) => {
        if (typeof data.name === "string" && typeof search === "string") {
          return data.name
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase());
        }

        return data.name == search;
      })
    );
  }, [search]);

  useEffect(() => {
    if (container.current) {
      const element = container.current as Element;
      element.addEventListener("mouseover", () => {
        setOpen(true);
      });
      element.addEventListener("mouseleave", () => {
        setOpen(false);
      });
    }

    if (searchInput.current && resultInput.current && defaultValue) {
      const defaultData = data.find((data: Data) => {
        return data.id === defaultValue;
      });

      if (defaultData) {
        searchInput.current.value = String(defaultData.name);
        setSearch(String(defaultData.name));
        resultInput.current.value = String(defaultValue);
      }
    }
    return () => {
      if (container.current) {
        const element = container.current as Element;
        element.removeEventListener("mouseover", () => {
          setOpen(true);
        });
        element.removeEventListener("mouseleave", () => {
          setOpen(false);
        });
      }
    };
  }, []);

  return (
    <div ref={container} className="relative">
      <input ref={resultInput} type="text" className="hidden" />
      <Input
        error={error ?? ""}
        rf={searchInput}
        handleChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
        }}
        placeholder={placeholder + "..."}
      />
      <div className={`absolute z-10 w-full py-2 ${open ? "" : "hidden"}`}>
        <ul className="bg-white dark:bg-dark-gray flex flex-col gap-2 p-2 rounded-md shadow-md max-h-96 overflow-y-scroll scrollbar">
          {filteredData.length ? (
            filteredData.map((data: Data) => {
              return (
                <li
                  key={data.id}
                  onClick={() => handleClick(data)}
                  className={`p-3 hover:bg-primary hover:text-white rounded-md cursor-pointer ${
                    search === data.name || defaultValue === data.name
                      ? "bg-primary text-white"
                      : ""
                  }`}
                >
                  {data.name}
                </li>
              );
            })
          ) : (
            <li className={`p-3 rounded-md`}>Not Found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default InputDropDown;
