import axios, { InternalAxiosRequestConfig } from "axios";
import { PROXY } from "../consts";
import { Dish } from "../interfaces/dish-interface";

const instance = axios.create({
  baseURL: PROXY,
});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = sessionStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    if (axios.isAxiosError(error)) {
      if (error.status === 401) {
        return Promise.reject(error.response?.data);
      }
    } else {
      Promise.reject("Error occured, try again later");
    }
  }
);

export const addDish = async (
  restaurantId: string | undefined,
  dishInfo: {
    title: string;
    description: string;
    weight: number;
    ingredients: string[];
    calories: number;
    category: string;
    price: number;
  }
): Promise<Dish> => {
  const response = await instance.post(
    `restaurant/${restaurantId}/dish`,
    JSON.stringify(dishInfo),
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data;
};
