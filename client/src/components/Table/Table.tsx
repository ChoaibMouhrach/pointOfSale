import { useState } from 'react';

import { ActiveColumn } from '../../types/Table';
import Pagination from '../Pagination';
import EmptyRow from './EmptyRow';
import Heading from './Heading';
import Row from './Row';
import RowSkelton from './RowSkelton';
import Search from './Search';

type TableProps = {
  headers: string[];
  rows: any[] | null;
  is_loading: boolean;
  page_count: number | null;
  current_page: number | null;
  set_page: Function;
};

const Table = ({
  headers,
  rows,
  is_loading,
  page_count,
  current_page,
  set_page,
}: TableProps) => {
  const [active_column, set_active_column] = useState<ActiveColumn>({
    name: null,
    direction: 'asc',
  });

  // sort the whole column
  const handleSort = (key: string) => {
    if (active_column.name === key) {
      set_active_column({
        name: key,
        direction: active_column.direction === 'asc' ? 'desc' : 'asc',
      });
      return;
    }

    set_active_column({
      name: key,
      direction: 'asc',
    });
  };

  function getSkelton() {
    const res: React.ReactNode[] = [];

    for (let i = 0; i < 8; i++) {
      res.push(<RowSkelton column_length={headers.length + 1} />);
    }

    return res;
  }

  return (
    <div className="grid w-full">
      <Search />
      <div className="w-full overflow-x-scroll scrollbar">
        <table className="w-full">
          <thead className="text-light-gray">
            <tr>
              {headers.map((header: string, index: number) => (
                <Heading
                  round_tl={index === 0}
                  key={header}
                  name={header}
                  active_column={active_column}
                  handleSort={handleSort}
                />
              ))}
              <Heading
                round_tr
                name="options"
                active_column={active_column}
                handleSort={handleSort}
              />
            </tr>
          </thead>
          <tbody className="bg-white text-dark transition duration-200 dark:text-light-gray dark:bg-dark-gray ">
            {is_loading && getSkelton()}
            {!is_loading &&
              rows &&
              rows.map((row) => <Row columns={Object.values(row)} />)}
            {!is_loading && rows && !rows.length && (
              <EmptyRow column_length={headers.length + 1} />
            )}
          </tbody>
        </table>
      </div>

      {!is_loading && rows && current_page && page_count && (
        <div className="w-full h-12 overflow-x-scroll scrollbar bg-primary flex justify-end px-3">
          <Pagination
            current_page={current_page}
            set_page={set_page}
            page_count={page_count}
          />
        </div>
      )}
    </div>
  );
};

export default Table;
