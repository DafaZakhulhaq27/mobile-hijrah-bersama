import { object, string, z } from "zod";
import { NonEmptyErrorMsg } from "../../../config/form";

export const changePasswordForm = object({
  password: string().nonempty(NonEmptyErrorMsg),
  password_confirmation: string().nonempty(NonEmptyErrorMsg),
}).refine(
  (data) => {
    return data.password_confirmation === data.password;
  },
  {
    message: "Password didn't match",
    path: ["password_confirmation"],
  }
);

export type ChangePasswordForm = z.infer<typeof changePasswordForm>;

export const initChangePasswordForm = {
  password: "",
  password_confirmation: "",
};
