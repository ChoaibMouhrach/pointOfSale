import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import ReactPaginate from "react-paginate";
import React from "react";
import { useSearchParams } from "react-router-dom";

type PaginationProps = {
  page_count: number;
  current_page: number;
  set_page: React.Dispatch<React.SetStateAction<number>>;
};

const Pagination = ({
  page_count,
  current_page,
  set_page,
}: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <ReactPaginate
      containerClassName="flex items-center gap-2"
      pageLinkClassName="hover:bg-light-gray hover:text-primary text-white rounded-md font-semibold h-8 w-8 block flex items-center justify-center"
      breakClassName="text-white rounded-md font-semibold h-8 w-8 block flex items-center justify-center"
      nextLinkClassName="hover:bg-light-gray hover:text-primary text-white rounded-md font-semibold h-8 w-8 block flex items-center justify-center"
      previousLinkClassName="hover:bg-light-gray hover:text-primary text-white rounded-md font-semibold h-8 w-8 block flex items-center justify-center"
      activeLinkClassName="bg-white text-primary"
      breakLabel="..."
      nextLabel={<MdKeyboardArrowRight />}
      onPageChange={(event: { selected: number }) => {
        set_page(event.selected + 1);
        setSearchParams({
          ...Object.fromEntries(searchParams.entries()),
          page: String(event.selected + 1),
        });
      }}
      pageRangeDisplayed={5}
      pageCount={page_count}
      forcePage={current_page - 1}
      previousLabel={<MdKeyboardArrowLeft />}
    />
  );
};

export default Pagination;
