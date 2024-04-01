import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { translate } from "../../assets/i18n";
import { createOrder } from "../../api/createOrder";
import { CartItem } from "../../interfaces/cart-interface";
import { useState } from "react";
import { clearCart } from "../../state/order/cartSlice";

const CartTotalInfo = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector<RootState, CartItem[]>(
    (state) => state.cart.items
  );
  const totalPrice = useSelector<RootState, number>(
    (state) => state.cart.total
  );
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );
  const dishIds = cartItems.map((item) => item.dishId);

  const handleCreateOrder = async () => {
    try {
      await createOrder(dishIds);

      setMessage(
        `${translate("order_placed_successfully", preferredLanguage)}`
      );
      dispatch(clearCart());
    } catch (error) {
      console.error(error);
      setMessage(`${translate("error_occured", preferredLanguage)}`);
    }
  };
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 w-full dark:bg-neutral-800 dark:border-neutral-700">
      <h3 className="text-2xl font-semibold mb-2 uppercase dark:text-white">
        {translate("cart_summary", preferredLanguage)}
      </h3>
      <div className="mt-8 flex justify-between mb-2">
        <span className="text-lg font-medium dark:text-white">
          {translate("subtotal", preferredLanguage)}
        </span>
        <span className="font-semibold dark:text-neutral-400">
          ₴{totalPrice}
        </span>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-lg font-medium dark:text-white">
          {translate("shipping", preferredLanguage)}
        </span>
        <span className="font-semibold dark:text-neutral-400">₴20.00</span>
      </div>
      <div className="flex justify-between mb-4">
        <span className="text-lg font-medium dark:text-white">
          {translate("total", preferredLanguage)}
        </span>
        <span className="font-semibold text-lg dark:text-neutral-400">
          ₴{totalPrice + 20}
        </span>
      </div>
      <button
        type="button"
        onClick={handleCreateOrder}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded-lg shadow-md"
      >
        {translate("place_order", preferredLanguage)}
      </button>
      {message.trim().length > 0 && (
        <span className="font-semibold dark:text-white">{message}</span>
      )}
    </div>
  );
};

export default CartTotalInfo;
