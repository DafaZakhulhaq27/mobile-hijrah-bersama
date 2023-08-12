import { MaterialIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as SecureStore from "expo-secure-store";
import { Flex, Icon, Pressable } from "native-base";
import { COLOR_PRIMARY } from "../../config/constant";
import {
  CART_ROUTE,
  HOME_ROUTE,
  LOGIN_ROUTE,
  PRODUCTS_ROUTE,
} from "../../navigation/routesNames";
import { DashboardRouteProps } from "../../navigation/types";
import CustomDrawerContent from "./_components/customDrawerContent";
import Home from "./_pages/home";
import ProductsScreen from "./_pages/products";

export type DashboardStackParamList = {
  [HOME_ROUTE]: undefined;
  [PRODUCTS_ROUTE]:
    | {
        _id: string;
        icon: string;
        name: string;
      }
    | undefined;
};

const Drawer = createDrawerNavigator<DashboardStackParamList>();

export default function DashboardScreen({ navigation }: DashboardRouteProps) {
  return (
    <Drawer.Navigator
      initialRouteName={HOME_ROUTE}
      useLegacyImplementation
      screenOptions={{
        headerTitle: "Hijrah Bersama",
        headerTitleStyle: {
          color: "black",
        },
        headerTintColor: COLOR_PRIMARY,
        drawerActiveTintColor: COLOR_PRIMARY,
        headerRight: () => (
          <Flex flexDirection="row">
            <Pressable onPress={() => navigation.push(CART_ROUTE)} mr="1.5">
              <Icon
                as={<MaterialIcons name="shopping-cart" />}
                size={5}
                mr="2"
                color="primary.500"
              />
            </Pressable>
            <Pressable
              onPress={async () => {
                await SecureStore.deleteItemAsync("token");
                navigation.replace(LOGIN_ROUTE);
              }}
              mr="1"
            >
              <Icon
                as={<MaterialIcons name="logout" />}
                size={5}
                mr="2"
                color="red.500"
              />
            </Pressable>
          </Flex>
        ),
      }}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen name={HOME_ROUTE} component={Home} />
      <Drawer.Screen name={PRODUCTS_ROUTE} component={ProductsScreen} />
    </Drawer.Navigator>
  );
}
