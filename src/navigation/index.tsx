import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import ChangePasswordScreen from "../pages/auth/changePassword";
import LoginScreen from "../pages/auth/login";
import DashboardScreen from "../pages/dashboard";
import CartScreen from "../pages/dashboard/_pages/cart";
import Notif from "../pages/dashboard/_pages/notif";
import OrderScreen from "../pages/dashboard/_pages/order";
import {
  CART_ROUTE,
  CHANGE_PASSWORD_ROUTE,
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
  NOTIF_ROUTE,
  ORDER_ROUTE,
} from "./routesNames";

export type RootStackParamList = {
  [DASHBOARD_ROUTE]: undefined;
  [LOGIN_ROUTE]: undefined;
  [CHANGE_PASSWORD_ROUTE]: undefined;
  [CART_ROUTE]: undefined;
  [ORDER_ROUTE]: {
    redirect_url: string;
  };
  [NOTIF_ROUTE]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const getToken = async () => {
    const tokenValue = await SecureStore.getItemAsync("token");
    setToken(tokenValue);
    setLoading(false);
  };

  useEffect(() => {
    getToken();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={token ? NOTIF_ROUTE : LOGIN_ROUTE}>
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
        <Stack.Screen name={ORDER_ROUTE} component={OrderScreen} />
        <Stack.Screen name={LOGIN_ROUTE} component={LoginScreen} />
        <Stack.Screen name={NOTIF_ROUTE} component={Notif} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
