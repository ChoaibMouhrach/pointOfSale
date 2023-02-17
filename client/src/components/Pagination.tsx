import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import ReactPaginate from 'react-paginate';

type PaginationProps = {
  page_count: number;
  current_page: number;
  set_page: Function;
};

const Pagination = ({
  page_count,
  current_page,
  set_page,
}: PaginationProps) => (
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
      set_page(event.selected);
    }}
    pageRangeDisplayed={3}
    pageCount={page_count}
    initialPage={current_page}
    previousLabel={<MdKeyboardArrowLeft />}
  />
);

export default Pagination;
