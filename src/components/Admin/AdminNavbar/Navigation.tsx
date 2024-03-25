import { useNavigate } from "react-router-dom";
import {
  ADMIN_DASHBOARD_ROUTE,
  ADMIN_RESTAURANTS_ROUTE,
  ADMIN_ROUTE,
} from "../../../consts";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { translate } from "../../../assets/i18n";

const Navigation = () => {
  const navigate = useNavigate();
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );
  return (
    <div
      className="
			border-[1px]
			w-full
			md:w-auto
			py-2
			rounded-full
			shadow-sm
			hover:shadow-md
			transition
			cursor-pointer
			dark:bg-neutral-600
			dark:text-white
			dark:border-neutral-700
		"
    >
      <div
        className="
			flex
			flex-row
			items-center
			justify-between
		"
      >
        <div
          onClick={() => navigate(ADMIN_ROUTE)}
          className="
			text-sm
			font-semibold
			px-6
		"
        >
          {translate("users", preferredLanguage)}
        </div>
        <div
          onClick={() => navigate(ADMIN_RESTAURANTS_ROUTE)}
          className="
			hidden
			sm:block
			text-sm
			font-semibold
			px-6
			border-l-[1px]
			flex-1
			text-center
		"
        >
          {translate("restaurants", preferredLanguage)}
        </div>
        <div
          onClick={() => navigate(ADMIN_DASHBOARD_ROUTE)}
          className="
			hidden
			sm:block
			text-sm
			font-semibold
			px-6
			border-l-[1px]
			flex-1
			text-center
		"
        >
          {translate("dashboard", preferredLanguage)}
        </div>
      </div>
    </div>
  );
};

export default Navigation;
