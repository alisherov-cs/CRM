type TTableTitleProps = {
  title: string;
  description: string;
};

export const TableTitle = ({ title, description }: TTableTitleProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600 mt-1">{description}</p>
    </div>
  );
};
