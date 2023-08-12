import { fetcher } from "../../utils/fetcher";
import { MainResponse } from "../response";

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
  fetcher<MainResponse>({
    path: "/api/v1/checkout/process_transaction",
    options: {
      method: "POST",
      body: form,
    },
  });

export const orderStatusCheck = async () =>
  fetcher<MainResponse>({
    path: "/api/v1/checkout/status",
  });

export const getListOrder = async () =>
  fetcher<MainResponse>({
    path: "/api/v1/checkout/list_order",
  });
