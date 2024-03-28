import { useParams } from "react-router-dom";
import AdminNav from "../../components/Admin/AdminNavbar/AdminNav";
import RestaurantComponent from "../../components/Admin/Content/Restaurants table/RestaurantComponent";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { getDishes } from "../../state/restaurant/dish/dish-slice";

const AdminRestaurantDishPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    try {
      dispatch(getDishes(id));
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [id, dispatch]);
  return (
    <>
      <AdminNav />
      <RestaurantComponent />
    </>
  );
};

export default AdminRestaurantDishPage;
