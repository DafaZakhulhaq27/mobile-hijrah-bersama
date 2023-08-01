import { zodResolver } from "@hookform/resolvers/zod";
import { Button, VStack } from "native-base";
import { FormProvider, useForm } from "react-hook-form";
import InputText from "../../../components/form/inputText";
import { HOME_ROUTE } from "../../../navigation/routesNames";
import { ChangePasswordRouteProps } from "../../../navigation/types";
import LayoutAuth from "../layout";
import {
  ChangePasswordForm,
  changePasswordForm,
  initChangePasswordForm,
} from "./model";

export default function ChangePasswordScreen({
  navigation,
}: ChangePasswordRouteProps) {
  const methods = useForm<ChangePasswordForm>({
    mode: "onTouched",
    resolver: zodResolver(changePasswordForm),
    defaultValues: initChangePasswordForm,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (e: any) => {
    navigation.replace(HOME_ROUTE);
  };

  return (
    <LayoutAuth title="Change Password" subtitle="this for new user">
      <FormProvider {...methods}>
        <VStack space={3} mt="5">
          <InputText label="Password" name="password" type="password" />
          <InputText
            label="Password Confirmation"
            name="password_confirmation"
            type="password"
          />

          <Button
            disabled={isSubmitting}
            mt="2"
            onPress={handleSubmit(onSubmit)}
          >
            Change Password
          </Button>
        </VStack>
      </FormProvider>
    </LayoutAuth>
  );
}
