import { useNavigate } from "react-router-dom";
import { CART_ROUTE, RESTAURANTS_ROUTE } from "../../consts";
import { translate } from "../../assets/i18n";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { CartItem } from "../../interfaces/cart-interface";

const Search = () => {
  const navigate = useNavigate();
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );
  const cartItems = useSelector<RootState, CartItem[]>(
    (state) => state.cart.items
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
          onClick={() => navigate(CART_ROUTE)}
          className="
			text-sm
			font-semibold
			px-6
			border-l-[1px]
			flex-1
			text-center
		"
        >
          <div className="flex items-center gap-4">
            {translate("cart", preferredLanguage)}
            <span className="text-md text-neutral-500 dark:text-neutral-400">
              {cartItems.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
