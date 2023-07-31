import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from ".";

export type LoginRouteProps = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;

export type HomeRouteProps = NativeStackScreenProps<RootStackParamList, "Home">;
