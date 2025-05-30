type TTableIntervalProps = {
  title: string;
  length?: number;
  total?: number;
};

export const TableInterval = ({
  title,
  length,
  total,
}: TTableIntervalProps) => {
  return (
    <div className="mt-4 text-sm text-gray-500 text-center">
      Showing {length} of {total} {title}
    </div>
  );
};
