import { MaterialIcons } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Icon, Pressable } from "native-base";
import { COLOR_PRIMARY } from "../../config/constant";
import {
  CART_ROUTE,
  HOME_ROUTE,
  PRODUCTS_ROUTE,
} from "../../navigation/routesNames";
import { DashboardRouteProps } from "../../navigation/types";
import Home from "./home";
import ProductsScreen from "./products";

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

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Help" onPress={() => alert("halo")} />
    </DrawerContentScrollView>
  );
}

export default function DashboardScreen({ navigation }: DashboardRouteProps) {
  return (
    <Drawer.Navigator
      useLegacyImplementation
      screenOptions={{
        headerTitle: "Hijrah Bersama",
        headerTitleStyle: {
          color: "black",
        },
        headerTintColor: COLOR_PRIMARY,
        drawerActiveTintColor: COLOR_PRIMARY,
        headerRight: () => (
          <Pressable onPress={() => navigation.push(CART_ROUTE)} mr="1">
            <Icon
              as={<MaterialIcons name="shopping-cart" />}
              size={5}
              mr="2"
              color="primary.500"
            />
          </Pressable>
        ),
      }}
      drawerContent={CustomDrawerContent}
    >
      <Drawer.Screen name={HOME_ROUTE} component={Home} />
      <Drawer.Screen name={PRODUCTS_ROUTE} component={ProductsScreen} />
    </Drawer.Navigator>
  );
}
