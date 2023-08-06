import { MainResponse } from "../../../api/response";

export type LoginRes = {
  data: {
    token: string;
    fb_token: string;
  };
} & MainResponse;
