import { object, string, z } from "zod";
import { NonEmptyErrorMsg } from "../../../config/form";

export const loginForm = object({
  email: string().email().nonempty(NonEmptyErrorMsg),
  password: string().nonempty(NonEmptyErrorMsg),
});

export type LoginForm = z.infer<typeof loginForm>;

export const initLoginForm = {
  email: "",
  password: "",
};

export type UserProfile = {
  _id: string;
  email: string;
  name: string;
  company_name: string;
  phone_number: string;
  status: "Active" | "Suspend";
  role: "User" | "Admin" | "Master";
  address: string;
  is_new_login: boolean;
};
