import { useParams } from "react-router-dom";
import NavbarComponent from "../../components/Navbar/Navbar-component";
import RestaurantHeroComponent from "../../components/Restaurants/Restaurant/RestaurantHeroComponent";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { findRestaurantById } from "../../state/restaurant/getRestaurantById-slice";
import ReviewList from "../../components/Review/ReviewList";

const RestaurantPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    try {
      dispatch(findRestaurantById(id));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [id, dispatch]);

  return (
    <>
      <RestaurantHeroComponent />
      <ReviewList />
      <NavbarComponent clickedPageValue="restaurants" />
    </>
  );
};

export default RestaurantPage;
