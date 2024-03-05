import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import RestaurantItemComponent from "./RestaurantItemComponent";
import { Restaurant } from "../../interfaces/restaurant-interface";
import SkeletonComponent from "../ui/SkeletonComponent";

const RestaurantsListComponent = () => {
  const restaurants = useSelector<RootState, Restaurant[]>(
    (state) => state.getRestaurants.restaurants
  );
  const status = useSelector<RootState>((state) => state.getRestaurants.status);

  return (
    <div className="w-[90%] mx-auto mt-16">
      {status === "loading" ? (
        <SkeletonComponent />
      ) : (
        <ul className="flex gap-4 items-center justify-center flex-wrap">
          {restaurants &&
            restaurants.map((restaurant) => (
              <li key={restaurant.id}>
                <RestaurantItemComponent data={restaurant} />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default RestaurantsListComponent;
