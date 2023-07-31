import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../pages/home";
import LoginScreen from "../pages/login";
import { HOME_ROUTE, LOGIN_ROUTE } from "./routesNames";

export type RootStackParamList = {
  [HOME_ROUTE]: undefined;
  [LOGIN_ROUTE]: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={LOGIN_ROUTE}>
        <Stack.Screen name={LOGIN_ROUTE} component={LoginScreen} />
        <Stack.Screen name={HOME_ROUTE} component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
