export interface Dish {
  id: string;
  restaurantId: string;
  title: string;
  weight: number;
  description: string;
  ingredients: string[];
  calories: number;
  category: string;
  price: number;
}

export interface DishState {
  dishes: Dish[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
