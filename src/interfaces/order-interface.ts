export interface Order {
  dishId: string;
  orderId: string;
  userId: string;
  status: string;
  averageWaitingTimeMinutes: number;
  orderTimestamp: number;
  userFirstName: string;
  userLastName: string;
  dishTitle: string;
  dishPrice: number;
}

export interface OrderState {
  orders: Order[] | [];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
