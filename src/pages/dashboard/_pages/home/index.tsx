import { Divider } from "native-base";
import { Category } from "../../../../api/categories/model";
import ContentWrapper from "../../../../components/contentWrapper";
import ListContainer from "../../../../components/list/container";
import SearchBar from "../../../../components/searchBar";
import useCategories from "../../../../hooks/categories";
import { PRODUCTS_ROUTE } from "../../../../navigation/routesNames";
import { HomeRouteProps } from "../../../../navigation/types";
import CategoryItem from "./categoryItem";

export default function Home({ navigation }: HomeRouteProps) {
  const { loading, categories, setSearch } = useCategories();

  return (
    <ContentWrapper>
      <SearchBar
        placeholder="Search Category"
        onChangeText={(v) => setSearch(v)}
      />
      <Divider height={1.5} />
      <ListContainer<Category>
        loading={loading}
        data={categories}
        item={(data) => (
          <CategoryItem
            key={data._id}
            onPress={() => navigation.navigate(PRODUCTS_ROUTE, data)}
            icon={data.icon}
            name={data.name}
          />
        )}
      />
    </ContentWrapper>
  );
}
