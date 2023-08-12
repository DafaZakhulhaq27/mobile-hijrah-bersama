import { Product } from "../../pages/dashboard/_pages/products/types";
import { MainResponse, PagedResponse } from "../response";

export type Cart = {
  _id: string;
  product: Product;
};

export type GetCarts = {
  data?: Cart[];
} & PagedResponse;

export type GetDetaiCart = {
  data: Cart;
} & MainResponse;
