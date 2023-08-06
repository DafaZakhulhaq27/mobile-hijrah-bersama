import { zodResolver } from "@hookform/resolvers/zod";
import * as SecureStore from "expo-secure-store";
import { Button, VStack, useToast } from "native-base";
import { FormProvider, useForm } from "react-hook-form";
import InputText from "../../../components/form/inputText";
import fetcher from "../../../config/fetcher";
import { decodeJwt } from "../../../config/jwtDecode";
import {
  CHANGE_PASSWORD_ROUTE,
  DASHBOARD_ROUTE,
} from "../../../navigation/routesNames";
import { LoginRouteProps } from "../../../navigation/types";
import LayoutAuth from "../layout";
import { LoginForm, UserProfile, initLoginForm, loginForm } from "./model";
import { LoginRes } from "./type";

export default function LoginScreen({ navigation }: LoginRouteProps) {
  const toast = useToast();
  const methods = useForm<LoginForm>({
    mode: "onTouched",
    resolver: zodResolver(loginForm),
    defaultValues: initLoginForm,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: LoginForm) => {
    await fetcher
      .post("/v1/auth/login", { ...data, fb_token: "xxx" })
      .then(async ({ data }: { data: LoginRes }) => {
        if (data.status) {
          toast.show({
            description: "login success",
          });
          await SecureStore.setItemAsync("token", data.data.token);
          const profileUser = decodeJwt<UserProfile>(data.data.token);
          if (profileUser.is_new_login) {
            navigation.replace(CHANGE_PASSWORD_ROUTE);
          } else {
            navigation.replace(DASHBOARD_ROUTE);
          }
        }
      })
      .catch((err) => {
        if (err.response.data.message) {
          alert(err.response.data.message);
        }
      });
  };

  return (
    <LayoutAuth title="Welcome" subtitle="Sign in to continue!">
      <FormProvider {...methods}>
        <VStack space={3} mt="5">
          <InputText label="Email" name="email" />
          <InputText label="Password" name="password" type="password" />

          <Button
            isLoading={isSubmitting}
            mt="2"
            onPress={handleSubmit(onSubmit)}
          >
            Sign in
          </Button>
        </VStack>
      </FormProvider>
    </LayoutAuth>
  );
}
