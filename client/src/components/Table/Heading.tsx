import { MdArrowUpward } from 'react-icons/md';

import { ActiveColumn } from '../../types/Table';

type HeadingProps = {
  handleSort: (key: string) => void;
  active_column: ActiveColumn;
  name: string;
  round_tr?: boolean;
  round_tl?: boolean;
};

const Heading = ({
  handleSort,
  active_column,
  name,
  round_tr,
  round_tl,
}: HeadingProps) => (
  <th
    className={`bg-primary ${round_tl ? 'rounded-tl-md' : ''} ${
      round_tr ? 'rounded-tr-md' : ''
    }`}
  >
    <button
      onClick={() => handleSort(name)}
      className="group w-full p-3 flex tracking-wide items-center"
    >
      <div className="flex items-center gap-2">
        <span>{name[0].toUpperCase() + name.slice(1)}</span>
        <MdArrowUpward
          className={`${
            active_column.name === name
              ? ''
              : 'group-hover:opacity-100 opacity-0'
          } ${
            active_column.direction === 'desc' ? 'rotate-180' : ''
          }  transition duration-200`}
        />
      </div>
    </button>
  </th>
);

export default Heading;
