import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import RestaurantItemComponent from "./RestaurantItemComponent";
import { Restaurant } from "../../interfaces/restaurant-interface";
import SkeletonComponent from "../ui/SkeletonComponent";
import { useState } from "react";
import RestaurantFilter from "./RestaurantFilter";

const RestaurantsListComponent = () => {
  const restaurants = useSelector<RootState, Restaurant[]>(
    (state) => state.getRestaurants.restaurants
  );
  const status = useSelector<RootState>((state) => state.getRestaurants.status);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredRestaurants = selectedType
    ? restaurants.filter(
        (restaurant) => restaurant.cuisineType === selectedType
      )
    : restaurants;

  // handle type selection
  const handleTypeSelect = (type: string | null) => {
    setSelectedType(type === selectedType ? null : type);
  };

  const clearFilter = () => {
    setSelectedType(null);
  };

  return (
    <div className="w-[80%] mx-auto mt-16 mb-24">
      {status === "loading" ? (
        <SkeletonComponent />
      ) : (
        <div>
          <RestaurantFilter
            restaurants={restaurants}
            selectedType={selectedType}
            handleTypeSelect={handleTypeSelect}
            clearFilter={clearFilter}
          />
          <ul className="flex gap-4 items-center justify-center 2xl:items-start 2xl:justify-start flex-wrap">
            {restaurants &&
              filteredRestaurants.map((restaurant) => (
                <li key={restaurant.id}>
                  <RestaurantItemComponent data={restaurant} />
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RestaurantsListComponent;
