interface CategoryBoxProps {
  icon: React.ReactNode;
  cuisine: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon,
  cuisine,
  selected,
}) => {
  return (
    <div
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-2
        p-3
        border-b-2
        hover:text-neutral-800
        transition
        cursor-pointer
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
    >
      {icon}
      <div className="font-medium text-sm">{cuisine}</div>
    </div>
  );
};

export default CategoryBox;
