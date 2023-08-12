import {
  DrawerContentComponentProps,
  DrawerItem,
} from "@react-navigation/drawer";
import { Category } from "../../../api/categories/model";
import ListContainer from "../../../components/list/container";
import useCategories from "../../../hooks/categories";
import { PRODUCTS_ROUTE } from "../../../navigation/routesNames";

export default function ListCategories({
  navigation,
}: DrawerContentComponentProps) {
  const { loading, categories } = useCategories();

  return (
    <ListContainer<Category>
      loading={loading}
      data={categories}
      item={(data) => (
        <DrawerItem
          key={data._id}
          label={data.name}
          onPress={() => navigation.navigate(PRODUCTS_ROUTE, data)}
        />
      )}
    />
  );
}
