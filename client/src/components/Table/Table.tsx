import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { MdAdd, MdRemove, MdOutlineEdit, MdDeleteOutline, MdArrowUpward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

type Header = {
  name: string;
  sort: boolean;
  key: string;
};

type TableProps = {
  headers: Header[];
  rows: { id: string; [key: string]: string | number | JSX.Element }[];
  displayEdit?: boolean;
  handleAdd?: (data: { id: string; [key: string]: string | number | JSX.Element }) => void;
  handleRemove?: (id: string) => void;
  handleDelete?: (id: string) => void;
  isLoading: boolean;
};

const Table = ({ headers, rows, isLoading, handleAdd, displayEdit, handleRemove, handleDelete }: TableProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeColumn, setActiveColumn] = useState<{ name: null | string; direction: "asc" | "desc" }>({
    name: null,
    direction: "asc",
  });

  // sort the whole column
  const handleSort = (key: string) => {
    if (activeColumn.name === key) {
      const direction = activeColumn.direction === "asc" ? "desc" : "asc";

      setActiveColumn({
        name: key,
        direction,
      });

      if (rows) {
        if (direction === "desc") {
          rows.sort((a, b) => {
            return a[key] > b[key] ? -1 : 1;
          });
        } else {
          rows.sort((a, b) => (a[key] > b[key] ? 1 : -1));
        }
      }

      return;
    }

    if (rows) {
      rows.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    }

    setActiveColumn({
      name: key,
      direction: "asc",
    });
  };

  function getSkeltonRows() {
    let skeltonRows = [];
    for (let i = 0; i < 8; i++) {
      skeltonRows.push(
        <tr key={i} className="border-t-4 border-white dark:border-dark">
          <td className=" bg-gray-300 dark:bg-dark-gray rounded-md" colSpan={headers.length + 1}>
            <div className="h-10"></div>
          </td>
        </tr>
      );
    }
    return skeltonRows;
  }

  return (
    <div className="w-full overflow-x-scroll scrollbar">
      <table className="w-full">
        <thead>
          <tr>
            {headers.map((header: Header, index: number) => {
              return (
                <th key={index} onClick={() => handleSort(header.key)} className={`bg-primary text-white ${index === 0 ? "rounded-l-md" : ""}`}>
                  <button className={`tracking-wide text-left p-3 w-full outline-none flex items-center gap-4`}>
                    <span>{header.name}</span>
                    <MdArrowUpward
                      className={`${activeColumn.name === header.key ? "opacity-100" : "opacity-0"} ${
                        activeColumn.direction === "desc" ? "rotate-180" : ""
                      } transition duration-300`}
                    />
                  </button>
                </th>
              );
            })}
            <th className={`p-3 bg-primary text-white tracking-wide text-left rounded-r-md`}>{t("options")}</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            (rows.length ? (
              rows.map((row, index: number) => {
                return (
                  <tr key={index}>
                    {Object.entries(row).map(([key, value]: [string, any], index: number) => {
                      return (
                        <td key={index} className={`p-3 tracking-wide `}>
                          {value}
                        </td>
                      );
                    })}
                    <td className="flex gap-4 items-center p-3">
                      {handleAdd && (
                        <button onClick={() => handleAdd(row)} className="text-success text-2xl">
                          <MdAdd />
                        </button>
                      )}
                      {displayEdit && (
                        <button onClick={() => navigate(`${row.id}/edit`)} className="text-success text-2xl">
                          <MdOutlineEdit />
                        </button>
                      )}
                      {handleRemove && (
                        <button onClick={() => handleRemove(row.id)} className="text-danger text-2xl">
                          <MdRemove />
                        </button>
                      )}
                      {handleDelete && (
                        <button onClick={() => handleDelete(row.id)} className="text-danger text-2xl">
                          <MdDeleteOutline />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={headers.length + 1} className="p-3 tracking-wide text-center">
                  Empty At the moment
                </td>
              </tr>
            ))}
          {isLoading && getSkeltonRows()}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
