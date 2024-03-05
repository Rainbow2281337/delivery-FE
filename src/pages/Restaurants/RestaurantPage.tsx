import { useParams } from "react-router-dom";
import NavbarComponent from "../../components/Navbar/Navbar-component";
import RestaurantHeroComponent from "../../components/Restaurants/Restaurant/RestaurantHeroComponent";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { findRestaurantById } from "../../state/restaurant/getRestaurantById-slice";

const RestaurantPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    try {
      dispatch(findRestaurantById(id));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [dispatch]);

  return (
    <>
      <RestaurantHeroComponent />
      <NavbarComponent clickedPageValue="restaurants" />
    </>
  );
};

export default RestaurantPage;
