import { MdModeEdit, MdOutlineRemoveRedEye, MdRemove } from 'react-icons/md';

type RowProps = {
  columns: string[];
};

const Row = ({ columns }: RowProps) => (
  <tr className=" border-b-4 border-light-gray dark:border-dark ">
    {columns.map((column) => (
      <td className="p-3 text-start tracking-wide">{column}</td>
    ))}
    <td className="p-3 text-start tracking-wide flex gap-4 items-center">
      <button className="text-xl text-white bg-primary h-8 w-16 flex items-center justify-center rounded-md">
        <MdOutlineRemoveRedEye />
      </button>
      <button className="text-lg text-white bg-success h-8 w-16 flex items-center justify-center rounded-md">
        <MdModeEdit />
      </button>
      <button className="text-2xl text-white bg-danger h-8 w-16 flex items-center justify-center rounded-md">
        <MdRemove />
      </button>
    </td>
  </tr>
);

export default Row;
