import { Divider } from "native-base";
import ContentWrapper from "../../../components/contentWrapper";
import SearchBar from "../../../components/searchBar";
import { PRODUCTS_ROUTE } from "../../../navigation/routesNames";
import { HomeRouteProps } from "../../../navigation/types";
import CategoryItem from "./categoryItem";

export default function Home({ navigation }: HomeRouteProps) {
  return (
    <ContentWrapper>
      <SearchBar
        placeholder="Search Category"
        onChangeText={(v) => console.log(v, "v")}
      />
      <Divider height={1.5} />
      <CategoryItem
        onPress={() =>
          navigation.navigate(PRODUCTS_ROUTE, {
            _id: "test",
            icon: "test",
            name: "test",
          })
        }
        icon="https://wallpaperaccess.com/full/317501.jpg"
        name="Umrah Regular"
      />
      <CategoryItem
        onPress={() => navigation.navigate(PRODUCTS_ROUTE)}
        icon="https://wallpaperaccess.com/full/317501.jpg"
        name="Umrah Regular"
      />
    </ContentWrapper>
  );
}
