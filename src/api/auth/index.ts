import { ChangePasswordForm } from "../../pages/auth/changePassword/model";
import { fetcher } from "../../utils/fetcher";
import { MainResponse } from "../response";
import { LoginData } from "./model";

type LoginForm = {
  email: string;
  password: string;
  fb_token: string;
};

export const login = async (data: LoginForm) =>
  fetcher<LoginData>({
    path: "/v1/auth/login",
    options: {
      method: "POST",
      body: data,
    },
  });

export const changePassword = async (data: ChangePasswordForm) =>
  fetcher<LoginData>({
    path: "/v1/auth/change_password",
    options: {
      method: "POST",
      body: data,
    },
  });

type DataCoordinate = {
  lat: string;
  long: string;
};

export const setCoordinate = async (data: DataCoordinate) =>
  fetcher<MainResponse>({
    path: "/v1/coordinat/get",
    options: {
      method: "POST",
      body: data,
    },
  });
