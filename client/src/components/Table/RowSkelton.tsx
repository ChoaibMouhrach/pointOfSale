import React from "react";

type RowSkeltonProps = {
  column_length: number;
};

const RowSkelton = ({ column_length }: RowSkeltonProps) => (
  <tr className="border-t-4 dark:border-dark border-light-gray">
    <td colSpan={column_length}>
      <div className="h-12 dark:bg-light-text bg-gray-400 animate-pulse" />
    </td>
  </tr>
);

export default RowSkelton;
