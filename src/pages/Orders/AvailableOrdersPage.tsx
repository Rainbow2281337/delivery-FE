import { useDispatch } from "react-redux";
import TopBar from "../../components/Navbar/TopBar";
import AvailableOrdersComponent from "../../components/Orders/Deliveryman/AvailableOrdersComponent";
import { AppDispatch } from "../../state/store";
import { useEffect } from "react";
import { getAllOrders } from "../../state/order/orderSlice";

const AvailableOrdersPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    try {
      dispatch(getAllOrders());
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }, [dispatch]);
  return (
    <>
      <TopBar />
      <AvailableOrdersComponent />
    </>
  );
};

export default AvailableOrdersPage;
