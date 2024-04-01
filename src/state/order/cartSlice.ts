import { createSlice } from "@reduxjs/toolkit";
import { CartItem } from "../../interfaces/cart-interface";

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const isItemExists = state.items.find(
        (item) => item.dishId === action.payload.dishId
      );

      if (isItemExists) {
        isItemExists.quantity++;
      } else {
        state.items.push(action.payload);
      }
      state.total += action.payload.price;
    },
    removeFromCart(state, action) {
      const itemToRemove = state.items.find(
        (item) => item.dishId === action.payload.dishId
      );
      if (itemToRemove) {
        state.items = state.items.filter(
          (item) => item.dishId !== itemToRemove.dishId
        );
        state.total -= itemToRemove.price * itemToRemove.quantity;
      }
    },
    clearCart(state) {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
