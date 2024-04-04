import { useSelector } from "react-redux";
import DashboardCard from "./DashboardCard";
import { RootState } from "../../../state/store";
import { translate } from "../../../assets/i18n";
import { Restaurant } from "../../../interfaces/restaurant-interface";
import { User } from "../../../interfaces/user-interface";
import { Order } from "../../../interfaces/order-interface";
import ChartComponent from "./ChartComponent";

const DashboardCardsList = () => {
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );
  const restaurants = useSelector<RootState, Restaurant[]>(
    (state) => state.getRestaurants.restaurants
  );
  const users = useSelector<RootState, User[]>(
    (state) => state.userTable.users
  );
  const orders = useSelector<RootState, Order[]>(
    (state) => state.orders.orders
  );

  const dashBoardCards = [
    {
      title: translate("total_users", preferredLanguage),
      value: users.length | 0,
    },
    {
      title: translate("total_restaurants", preferredLanguage),
      value: restaurants.length | 0,
    },
    {
      title: translate("total_categories", preferredLanguage),
      value: 14,
    },
    {
      title: translate("total_orders", preferredLanguage),
      value: orders.length,
    },
  ];
  return (
    <div>
      <div
        className="
          flex
          flex-wrap
          gap-3
          items-center
          justify-center
          md:justify-start
        "
      >
        {dashBoardCards.map((card, index) => (
          <DashboardCard key={index} title={card.title} value={card.value} />
        ))}
      </div>

      <div className="mt-8">
        <ChartComponent />
      </div>
    </div>
  );
};

export default DashboardCardsList;
