import { fetcher } from "../../utils/fetcher";
import { filter } from "../filter";
import { GetCategories, GetDetailCategory } from "./model";

export const getCategories = async (params: filter) =>
  fetcher<GetCategories>({ path: "/v1/category", params: params });

export const getCategoryDropdown = async (params: filter) =>
  fetcher<GetCategories>({ path: "/api/v1/category", params: params });

export const getDetailCategory = async (id: string) =>
  fetcher<GetDetailCategory>({
    path: `/v1/category`,
    params: {
      _id: id,
    },
  });
