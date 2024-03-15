import { Restaurant } from "../../interfaces/restaurant-interface";

interface RestaurantFilterProps {
  restaurants: Restaurant[];
  selectedType: string | null;
  handleTypeSelect: (type: string | null) => void;
  clearFilter: () => void;
}

const RestaurantFilter: React.FC<RestaurantFilterProps> = ({
  restaurants,
  selectedType,
  handleTypeSelect,
  clearFilter,
}) => {
  // remove duplicates
  const uniqueCuisineTypes = Array.from(
    new Set(restaurants.map((restaurant) => restaurant.cuisineType))
  );
  return (
    <div className="mb-6">
      <ul className="flex flex-wrap gap-4 items-center justify-center 2xl:items-start 2xl:justify-start">
        <li
          onClick={clearFilter}
          className={`${
            selectedType === null
              ? "py-1 px-4 cursor-pointer bg-[#272a27]/85 rounded-lg"
              : "py-1 px-4 cursor-pointer bg-[#272a27] rounded-lg hover:opacity-85 duration-200"
          }`}
        >
          <button className="text-lg font-bold text-white">All</button>
        </li>
        {uniqueCuisineTypes.map((type) => (
          <div
            key={type}
            onClick={() => handleTypeSelect(type)}
            className={`${
              selectedType === type
                ? "py-1 px-4 cursor-pointer bg-[#272a27]/85 rounded-lg"
                : "py-1 px-4 cursor-pointer bg-[#272a27] rounded-lg hover:opacity-85 duration-200"
            }`}
          >
            <li className="text-lg font-bold text-white">{type}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantFilter;
