import { useSelector } from "react-redux";
import { RootState } from "../../../../state/store";
import SkeletonComponent from "../../../ui/SkeletonComponent";
import DishTable from "./DishTable";

const RestaurantComponent = () => {
  const status = useSelector<RootState>((state) => state.getDishes.status);
  return (
    <div>
      <div>{status === "loading" ? <SkeletonComponent /> : <DishTable />}</div>
    </div>
  );
};

export default RestaurantComponent;
