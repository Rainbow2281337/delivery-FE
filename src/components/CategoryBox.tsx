interface CategoryBoxProps {
  icon: React.ReactNode;
  category: string;
  selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
  icon,
  category,
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
        dark:hover:text-neutral-500
        ${
          selected
            ? "border-b-neutral-800 dark:border-b-white"
            : "border-transparent"
        }
        ${
          selected
            ? "text-neutral-800 dark:text-neutral-500 dark:border-b-white"
            : "text-neutral-500 dark:text-neutral-100"
        }
      `}
    >
      {icon}
      <div className="font-medium text-sm">{category}</div>
    </div>
  );
};

export default CategoryBox;
