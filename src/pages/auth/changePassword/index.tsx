import { zodResolver } from "@hookform/resolvers/zod";
import { Button, VStack, useToast } from "native-base";
import { FormProvider, useForm } from "react-hook-form";
import { changePassword } from "../../../api/auth";
import InputText from "../../../components/form/inputText";
import { DASHBOARD_ROUTE } from "../../../navigation/routesNames";
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
  const toast = useToast();
  const methods = useForm<ChangePasswordForm>({
    mode: "onTouched",
    resolver: zodResolver(changePasswordForm),
    defaultValues: initChangePasswordForm,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: ChangePasswordForm) => {
    try {
      const res = await changePassword(data);
      if (res.status) {
        toast.show({
          description: "Change Password success",
        });
        navigation.replace(DASHBOARD_ROUTE);
      } else {
        alert(res.message);
      }
    } catch (error) {
      alert(error);
    }
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
            isLoading={isSubmitting}
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
