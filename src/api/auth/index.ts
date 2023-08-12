import { ChangePasswordForm } from "../../pages/auth/changePassword/model";
import { fetcher } from "../../utils/fetcher";
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
