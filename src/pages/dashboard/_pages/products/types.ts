import { MainResponse, PagedResponse } from "../../../api/response";

export type Schedule = {
  date: string;
  code_flight_schedule: string;
  boarding_passcode: string;
  departure_time: string;
  arrived_time: string;
};

export type Product = {
  _id: string;
  category: {
    _id: string;
    icon: string;
    name: string;
  };
  schedule: Schedule[];
  is_sold: boolean;
  isAddedCart: boolean;
  seat: number;
  price: number;
  program: string;
};

export type GetProducts = {
  data: Product[];
} & PagedResponse;

export type GetDetaiProduct = {
  data: Product;
} & MainResponse;
