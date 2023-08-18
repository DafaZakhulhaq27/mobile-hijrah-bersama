import { zodResolver } from "@hookform/resolvers/zod";
import * as SecureStore from "expo-secure-store";
import { Button, VStack, useToast } from "native-base";
import { FormProvider, useForm } from "react-hook-form";
import { login } from "../../../api/auth";
import InputText from "../../../components/form/inputText";
import { useNotificationContext } from "../../../hooks/context";
import {
  CHANGE_PASSWORD_ROUTE,
  DASHBOARD_ROUTE,
} from "../../../navigation/routesNames";
import { LoginRouteProps } from "../../../navigation/types";
import { decodeJwt } from "../../../utils/jwtDecode";
import LayoutAuth from "../layout";
import { LoginForm, UserProfile, initLoginForm, loginForm } from "./model";

export default function LoginScreen({ navigation }: LoginRouteProps) {
  const toast = useToast();
  const { tokenExpoPushNotif } = useNotificationContext();
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
    try {
      const res = await login({ ...data, fb_token: tokenExpoPushNotif ?? "" });
      if (res.status) {
        toast.show({
          description: "login success",
        });
        await SecureStore.setItemAsync("token", res.data.token);
        const profileUser = decodeJwt<UserProfile>(res.data.token);
        if (JSON.parse(profileUser.is_new_login)) {
          navigation.replace(CHANGE_PASSWORD_ROUTE);
        } else {
          navigation.replace(DASHBOARD_ROUTE);
        }
      } else {
        alert(res.message);
      }
    } catch (error) {
      alert(error);
    }
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
