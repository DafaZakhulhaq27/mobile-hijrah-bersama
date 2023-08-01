import { MaterialIcons } from "@expo/vector-icons";
import {
  DrawerContentComponentProps,
  DrawerItem,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Icon, Pressable } from "native-base";
import Home from "./home";

export type DashboardStackParamList = {
  [HOME_ROUTE]: undefined;
};

const Drawer = createDrawerNavigator<DashboardStackParamList>();

import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { CART_ROUTE, HOME_ROUTE } from "../../navigation/routesNames";
import { DashboardRouteProps } from "../../navigation/types";

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
        drawerActiveTintColor: "#06b6d4",
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
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}
