import { Divider } from "native-base";
import { Category } from "../../../../api/categories/model";
import ContentWrapper from "../../../../components/contentWrapper";
import ListContainer from "../../../../components/list/container";
import SearchBar from "../../../../components/searchBar";
import useCategories from "../../../../hooks/categories";
import { PRODUCTS_ROUTE } from "../../../../navigation/routesNames";
import { HomeRouteProps } from "../../../../navigation/types";
import CategoryItem from "./categoryItem";
import { useEffect } from "react";
import * as Location from "expo-location";
import { BackHandler, Alert } from "react-native";
import { setCoordinate } from "../../../../api/auth";
export default function Home({ navigation }: HomeRouteProps) {
  const { loading, categories, setSearch, getCategory } = useCategories();

  // set current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location Permission must allowed", [
          { text: "OK", onPress: () => BackHandler.exitApp() },
        ]);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (location.coords) {
        await setCoordinate({
          lat: location.coords.altitude?.toString() ?? "",
          long: location.coords.longitude?.toString() ?? "",
        });
      }
    })();
  }, []);

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
        onRefresh={getCategory}
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
