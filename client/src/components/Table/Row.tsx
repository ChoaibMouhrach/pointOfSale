import React, { useState } from "react";
import { MdModeEdit, MdAdd, MdRemove } from "react-icons/md";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import Loader from "../Loaders/Loader";

type RowProps = {
  columns: string[];
  displayEdit: boolean;
  displayDelete: boolean;
  handleDelete?: (id: string) => void;
  handleAdd?: (columns: string[]) => void;
};

const Row = ({
  displayEdit,
  displayDelete,
  columns,
  handleDelete,
  handleAdd,
}: RowProps) => {
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();

  return (
    <tr className=" border-b-4 border-light-gray dark:border-dark ">
      {columns.map((column: string, index: number) => (
        <td key={index} className="p-3 text-start tracking-wide">
          {column}
        </td>
      ))}
      <td className="p-3 text-start tracking-wide flex gap-4 items-center">
        {handleAdd && (
          <Button
            handleClick={() => {
              handleAdd(columns);
            }}
            className="h-10 text-lg"
            variation="success"
            content={<MdAdd />}
          />
        )}
        {displayEdit && (
          <Button
            handleClick={() => {
              navigate(`${columns[0]}/edit`);
            }}
            className="h-10 text-lg"
            variation="success"
            content={<MdModeEdit />}
          />
        )}
        {displayDelete && (
          <Button
            handleClick={async () => {
              if (handleDelete) {
                setDeleting(true);
                await handleDelete(columns[0]);
                setDeleting(false);
              }
            }}
            className="h-10 text-lg"
            variation="error"
            content={deleting ? <Loader /> : <MdRemove />}
          />
        )}
      </td>
    </tr>
  );
};

export default Row;
