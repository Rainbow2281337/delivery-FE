import { useDispatch } from "react-redux";
import ActionNavComponent from "../../components/Admin/Action Nav/ActionNavComponent";
import RestaurantsTableComponent from "../../components/Admin/Content/Restaurants table/RestaurantsTableComponent";
import { AppDispatch } from "../../state/store";
import { getRestaurants } from "../../state/restaurant/restaurant-slice";
import { useEffect } from "react";
import NavbarComponent from "../../components/Navbar/Navbar-component";

const AdminRestaurantsPage = () => {
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
      <ActionNavComponent />
      <div className="mx-3">
        <RestaurantsTableComponent />
      </div>
      <NavbarComponent clickedPageValue="profile" />
    </>
  );
};

export default AdminRestaurantsPage;
