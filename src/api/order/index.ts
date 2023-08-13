import { fetcher } from "../../utils/fetcher";
import { MainResponse } from "../response";
import { CreateOrderResponse, GetCurrentOrderResposne } from "./model";

type OrderForm = {
  amount: number;
  order_detail: {
    product_id: string;
    qty: number;
    price: number;
    amount: number;
  }[];
};

export const createOrder = async (form: OrderForm) =>
  fetcher<CreateOrderResponse>({
    path: "/v1/checkout/process_transaction",
    options: {
      method: "POST",
      body: form,
    },
  });

export const getOrderStatusCheck = async () =>
  fetcher<MainResponse>({
    path: "/v1/checkout/cek_status",
  });

export const getCurrentOrder = async () =>
  fetcher<GetCurrentOrderResposne>({
    path: "/v1/checkout/cek_curent_order",
  });

export const getListOrder = async () =>
  fetcher<MainResponse>({
    path: "/v1/checkout/list_order",
  });
