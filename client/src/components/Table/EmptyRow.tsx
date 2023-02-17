type EmptyRowProps = {
  column_length: number;
};

const EmptyRow = ({ column_length }: EmptyRowProps) => (
  <tr className="border-t-4 border-dark">
    <td colSpan={column_length}>
      <div className="text-center flex items-center justify-center h-12">
        Empty at the moment
      </div>
    </td>
  </tr>
);

export default EmptyRow;
