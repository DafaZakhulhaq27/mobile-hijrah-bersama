import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from ".";
import { DashboardStackParamList } from "../pages/dashboard";

export type LoginRouteProps = NativeStackScreenProps<
  RootStackParamList,
  "Login"
>;

export type ChangePasswordRouteProps = NativeStackScreenProps<
  RootStackParamList,
  "Change Password"
>;

export type DashboardRouteProps = NativeStackScreenProps<RootStackParamList, "Dashboard">;
export type CartRouteProps = NativeStackScreenProps<RootStackParamList, "Cart">;

// DASHBOARD DRAWER
export type HomeRouteProps = NativeStackScreenProps<DashboardStackParamList, "Home">;
export type ProductsRouteProps = NativeStackScreenProps<DashboardStackParamList, "Products">;
