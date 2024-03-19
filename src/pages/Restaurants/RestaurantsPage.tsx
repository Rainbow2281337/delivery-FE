import { useDispatch } from "react-redux";
import TopBar from "../../components/Navbar/TopBar";
import { AppDispatch } from "../../state/store";
import { useEffect } from "react";
import { getRestaurants } from "../../state/restaurant/restaurant-slice";
import RestaurantsListComponent from "../../components/Restaurants/RestaurantsListComponent";

const RestaurantsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    try {
      dispatch(getRestaurants());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [dispatch]);

  return (
    <>
      <div>
        <TopBar />
        <RestaurantsListComponent />
      </div>
    </>
  );
};

export default RestaurantsPage;
