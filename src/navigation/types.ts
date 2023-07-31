import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from ".";

export type LoginRouteProps = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;

export type ChangePasswordRouteProps = NativeStackScreenProps<
  RootStackParamList,
  "Change Password"
>;

export type HomeRouteProps = NativeStackScreenProps<RootStackParamList, "Home">;
