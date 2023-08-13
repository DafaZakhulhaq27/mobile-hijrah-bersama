import { MainResponse } from "../response";

export type GetCurrentOrderResposne = {
  order_id: string;
  link_payment: string;
} & MainResponse;

export type CreateOrderResponse = {
  dataPayment: { response: string };
} & MainResponse;

export type DataPayment = {
  token: string;
  redirect_url: string;
};
