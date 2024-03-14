import { Dish } from "../../interfaces/dish-interface";

interface DishFilterProps {
  dishes: Dish[];
  selectedCategory: string | null;
  handleCategorySelect: (category: string) => void;
  clearFilter: () => void;
}

const DishFilter: React.FC<DishFilterProps> = ({
  dishes,
  selectedCategory,
  handleCategorySelect,
  clearFilter,
}) => {
  // remove duplicates
  const uniqueCategories = Array.from(
    new Set(dishes.map((dish) => dish.category))
  );

  return (
    <div className="mb-6">
      <ul className="flex flex-wrap gap-4 items-center justify-center md:items-start md:justify-start">
        <li
          onClick={clearFilter}
          className={`${
            selectedCategory === null
              ? "py-1 px-4 cursor-pointer bg-[#272a27]/85 rounded-lg"
              : "py-1 px-4 cursor-pointer bg-[#272a27] rounded-lg hover:opacity-85 duration-200"
          }`}
        >
          <button className="text-lg font-bold text-white">All</button>
        </li>
        {uniqueCategories.map((category) => (
          <div
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={`${
              selectedCategory === category
                ? "py-1 px-4 cursor-pointer bg-[#272a27]/85 rounded-lg"
                : "py-1 px-4 cursor-pointer bg-[#272a27] rounded-lg hover:opacity-85 duration-200"
            }`}
          >
            <li className="text-lg font-bold text-white">{category}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DishFilter;
