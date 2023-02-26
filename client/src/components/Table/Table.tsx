import React, { useState } from "react";

import { ActiveColumn } from "../../types/Table";
import Pagination from "../Pagination";
import EmptyRow from "./EmptyRow";
import Heading from "./Heading";
import Row from "./Row";
import RowSkelton from "./RowSkelton";
import Search from "./Search";

type TableProps = {
  headers: { name: string; sort: boolean }[];
  rows: any[] | null;
  is_loading: boolean;
  page_count: number | null;
  current_page: number;
  set_page: React.Dispatch<React.SetStateAction<number>>;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  search: string;
  displayEdit?: boolean;
  displayDelete?: boolean;
  handleDelete?: (id: string) => void;
  handleAdd?: (columns: string[]) => void;
};

const Table = ({
  headers,
  search,
  displayEdit,
  displayDelete,
  handleDelete,
  setSearch,
  rows,
  is_loading,
  page_count,
  current_page,
  handleAdd,
  set_page,
}: TableProps) => {
  const [active_column, set_active_column] = useState<ActiveColumn>({
    name: null,
    direction: "asc",
  });

  // sort the whole column
  const handleSort = (key: string) => {
    if (active_column.name === key) {
      const direction = active_column.direction === "asc" ? "desc" : "asc";

      set_active_column({
        name: key,
        direction,
      });

      if (rows) {
        if (direction === "desc") {
          rows.sort((a, b) => (a[key] > b[key] ? -1 : 1));
        } else {
          rows.sort((a, b) => (a[key] > b[key] ? 1 : -1));
        }
      }

      return;
    }

    if (rows) {
      rows.sort((a, b) => (a[key] > b[key] ? 1 : -1));
    }

    set_active_column({
      name: key,
      direction: "asc",
    });
  };

  function getSkelton() {
    const res: React.ReactNode[] = [];

    for (let i = 0; i < 8; i++) {
      res.push(<RowSkelton key={i} column_length={headers.length + 1} />);
    }

    return res;
  }

  return (
    <div className="grid w-full">
      <Search search={search} setSearch={setSearch} />

      <div className="w-full overflow-x-scroll scrollbar">
        <table className="w-full">
          <thead className="text-light-gray">
            <tr>
              {headers.map((header, index: number) => (
                <Heading
                  key={header.name}
                  round_tl={index === 0}
                  name={header.name}
                  active_column={active_column}
                  handleSort={header.sort ? handleSort : undefined}
                />
              ))}
              <Heading round_tr name="options" active_column={active_column} />
            </tr>
          </thead>
          <tbody className="bg-white text-dark transition duration-200 dark:text-light-gray dark:bg-dark-gray ">
            {is_loading && getSkelton()}
            {!is_loading &&
              rows &&
              rows.map((row, id) => (
                <Row
                  displayEdit={displayEdit ?? false}
                  displayDelete={displayDelete ?? false}
                  handleDelete={handleDelete}
                  key={id}
                  handleAdd={handleAdd}
                  columns={Object.values(row)}
                />
              ))}
            {!is_loading && rows && !rows.length && (
              <EmptyRow column_length={headers.length + 1} />
            )}
          </tbody>
        </table>
      </div>

      <div className="w-full h-12 rounded-b-md bg-primary flex justify-center lg:justify-end px-3">
        {!is_loading && page_count && (
          <Pagination
            current_page={current_page}
            set_page={set_page}
            page_count={page_count}
          />
        )}
      </div>
    </div>
  );
};

export default Table;
