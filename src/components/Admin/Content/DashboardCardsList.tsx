import { useSelector } from "react-redux";
import DashboardCard from "./DashboardCard";
import { RootState } from "../../../state/store";
import { translate } from "../../../assets/i18n";
import { Restaurant } from "../../../interfaces/restaurant-interface";
import { User } from "../../../interfaces/user-interface";

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
        {dashBoardCards.map((card) => (
          <DashboardCard
            key={card.title}
            title={card.title}
            value={card.value}
          />
        ))}
      </div>
    </div>
  );
};

export default DashboardCardsList;
