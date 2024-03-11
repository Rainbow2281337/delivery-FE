import { Review } from "./review-interface";

export interface Restaurant {
  id: string | null;
  title: string | null;
  cuisineType: string | null;
  address: string | null;
  openHours: string | null;
  closeHours: string | null;
  phoneNumber: string | null;
  averageRating: number | null;
  reviews: Review[] | [];
  image?: {
    type: string;
    data: number[];
  };
  imageMimeType?: string;
}

export interface RestaurantState {
  restaurants: Restaurant[] | [];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface RestaurantDeletionState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
