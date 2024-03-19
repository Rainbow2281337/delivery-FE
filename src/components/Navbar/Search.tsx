import { useNavigate } from "react-router-dom";
import { RESTAURANTS_ROUTE } from "../../consts";
import { translate } from "../../assets/i18n";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

const Search = () => {
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
          onClick={() => navigate(RESTAURANTS_ROUTE)}
          className="
			text-sm
			font-semibold
			px-6
		"
        >
          {translate("shop", preferredLanguage)}
        </div>
        <div
          onClick={() => navigate("*")}
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
          {translate("cart", preferredLanguage)}
        </div>
      </div>
    </div>
  );
};

export default Search;
