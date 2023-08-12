import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Divider, Text } from "native-base";
import ListCategories from "./listCategories";

export default function CustomDrawerContent(
  props: DrawerContentComponentProps
) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <Text mx={3} mt={5} fontWeight="bold">
        Categories :
      </Text>
      <Divider mt={2} />
      <ListCategories {...props} />
    </DrawerContentScrollView>
  );
}
