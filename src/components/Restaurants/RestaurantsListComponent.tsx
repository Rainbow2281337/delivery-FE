import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import RestaurantItemComponent from "./RestaurantItemComponent";
import { Restaurant } from "../../interfaces/restaurant-interface";
import SkeletonComponent from "../ui/SkeletonComponent";
import { useState } from "react";
import Container from "../Container";
import Categories from "../Navbar/Categories";
import NoMatches from "../NoMatches";

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
  return (
    <Container>
      <div className="pb-20 pt-32">
        <Categories
          selectedType={selectedType}
          handleTypeSelect={handleTypeSelect}
        />
        {filteredRestaurants.length === 0 ? (
          <NoMatches />
        ) : (
          <div
            className="
              pt-8
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
              md:grid-cols-3
              md:gap-4
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
            "
          >
            {status === "loading" ? (
              <SkeletonComponent />
            ) : (
              filteredRestaurants.map((restaurant) => (
                <RestaurantItemComponent
                  key={restaurant.id}
                  data={restaurant}
                />
              ))
            )}
          </div>
        )}
      </div>
    </Container>
  );
};

export default RestaurantsListComponent;
