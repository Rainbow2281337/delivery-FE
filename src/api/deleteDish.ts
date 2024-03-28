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

export const deleteDish = async (
  restaurantId: string | undefined,
  dishId: string
): Promise<Dish> => {
  const response = await instance.delete(
    `restaurant/${restaurantId}/dish/${dishId}`
  );

  return response.data;
};
