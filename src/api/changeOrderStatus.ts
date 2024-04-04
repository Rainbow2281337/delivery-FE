import axios, { InternalAxiosRequestConfig } from "axios";
import { PROXY } from "../consts";
import { Order } from "../interfaces/order-interface";

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

export const changeOrderStatus = async (
  orderId: string,
  status: string
): Promise<Order[]> => {
  const response = await instance.put(
    `order/${orderId}/status`,
    { status },
    { headers: { "Content-Type": "application/json" } }
  );

  return response.data;
};
