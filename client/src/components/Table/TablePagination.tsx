import React from "react";
import Pagination from "../Pagination";

type TablePaginationProps = {
  lastPage: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<any>>;
};

const TablePagination = ({ lastPage, page, setPage }: TablePaginationProps) => {
  return (
    <div className="flex justify-end items-center bg-primary h-12 rounded-md px-4">
      <Pagination page_count={lastPage} current_page={page} set_page={setPage} />
    </div>
  );
};

export default TablePagination;
