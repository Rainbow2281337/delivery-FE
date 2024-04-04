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

export interface OrderHistory {
  orderId: string;
  entries: [
    {
      orderId: string;
      status: string;
      averageWaitingTimeMinutes: number;
      orderTimestamp: number;
      dishId: string;
      dishTitle: string;
      dishPrice: number;
      dishCalories: number;
    }
  ];
}

export interface OrderHistoryState {
  orderHistory: OrderHistory[] | [];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface OrderState {
  orders: Order[] | [];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
