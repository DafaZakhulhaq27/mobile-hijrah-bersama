import { zodResolver } from "@hookform/resolvers/zod";
import { Button, VStack } from "native-base";
import { FormProvider, useForm } from "react-hook-form";
import InputText from "../../../components/form/inputText";
import { LoginRouteProps } from "../../../navigation/types";
import LayoutAuth from "../layout";
import { LoginForm, initLoginForm, loginForm } from "./model";

export default function LoginScreen({ navigation }: LoginRouteProps) {
  const methods = useForm<LoginForm>({
    mode: "onTouched",
    resolver: zodResolver(loginForm),
    defaultValues: initLoginForm,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (e: any) => {
    console.log(e, "e");
  };

  return (
    <LayoutAuth title="Welcome" subtitle="Sign in to continue!">
      <FormProvider {...methods}>
        <VStack space={3} mt="5">
          <InputText label="Email" name="email" />
          <InputText label="Password" name="password" type="password" />

          <Button
            disabled={isSubmitting}
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
