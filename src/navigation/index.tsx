import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ChangePasswordScreen from "../pages/auth/changePassword";
import LoginScreen from "../pages/auth/login";
import DashboardScreen from "../pages/dashboard";
import CartScreen from "../pages/dashboard/cart";
import {
  CART_ROUTE,
  CHANGE_PASSWORD_ROUTE,
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
} from "./routesNames";

export type RootStackParamList = {
  [DASHBOARD_ROUTE]: undefined;
  [LOGIN_ROUTE]: undefined;
  [CHANGE_PASSWORD_ROUTE]: undefined;
  [CART_ROUTE]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={LOGIN_ROUTE}>
        <Stack.Screen name={LOGIN_ROUTE} component={LoginScreen} />
        <Stack.Screen
          name={DASHBOARD_ROUTE}
          options={{
            headerShown: false,
          }}
          component={DashboardScreen}
        />
        <Stack.Screen
          name={CHANGE_PASSWORD_ROUTE}
          component={ChangePasswordScreen}
        />
        <Stack.Screen name={CART_ROUTE} component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
