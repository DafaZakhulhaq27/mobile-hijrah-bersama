import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChangePasswordScreen from "../pages/auth/changePassword";
import LoginScreen from "../pages/auth/login";
import HomeScreen from "../pages/home";
import { CHANGE_PASSWORD, HOME_ROUTE, LOGIN_ROUTE } from "./routesNames";

export type RootStackParamList = {
  [HOME_ROUTE]: undefined;
  [LOGIN_ROUTE]: undefined;
  [CHANGE_PASSWORD]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={LOGIN_ROUTE}>
        <Stack.Screen name={LOGIN_ROUTE} component={LoginScreen} />
        <Stack.Screen name={HOME_ROUTE} component={HomeScreen} />
        <Stack.Screen name={CHANGE_PASSWORD} component={ChangePasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
