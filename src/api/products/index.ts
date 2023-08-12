import { fetcher } from "../../utils/fetcher";
import { filter } from "../filter";
import { GetDetaiProduct, GetProducts } from "./model";

export type FilterProduct = { category?: string } & filter;

export const getProduct = async (params: FilterProduct) =>
  fetcher<GetProducts>({ path: "/v1/product", params: params });

export const getDetailProduct = async (id: string) =>
  fetcher<GetDetaiProduct>({
    path: `/v1/product`,
    params: {
      _id: id,
    },
  });
