import { fetcher } from "../../utils/fetcher";
import { filter } from "../filter";
import { MainResponse } from "../response";
import { GetCarts } from "./model";

export const getCarts = async (params: filter) =>
  fetcher<GetCarts>({ path: "/v1/shopping_cart", params: params });

type CartForm = {
  id_product: string;
  qty: number;
};

export const createCart = async (form: CartForm) =>
  fetcher<MainResponse>({
    path: "/v1/shopping_cart",
    options: {
      method: "POST",
      body: form,
    },
  });

export const deleteCart = async (id: string) =>
  fetcher<MainResponse>({
    path: `/v1/shopping_cart`,
    params: {
      _id: id,
    },
    options: {
      method: "DELETE",
    },
  });
