import { Text } from "native-base";
import { useEffect, useState } from "react";
import { getProduct } from "../../../../api/products";
import ContentWrapper from "../../../../components/contentWrapper";
import ListContainer from "../../../../components/list/container";
import { ProductsRouteProps } from "../../../../navigation/types";
import Category from "./category";
import ProductItem from "./productItem";
import { Product } from "./types";
import SearchBar from "../../../../components/searchBar";

export default function ProductsScreen({ route }: ProductsRouteProps) {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getProduct({
        limit: "9999",
        page: "1",
        search: search,
        category: route.params?._id,
      });
      setProducts(res.data);
    } catch (err) {
      console.log(err, "err");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [route.params, search]);

  return (
    <ContentWrapper>
      {route.params ? (
        <Category icon={route.params.icon} name={route.params.name} />
      ) : (
        <Text mx={3} my={2} fontWeight="bold">
          All Products :
        </Text>
      )}
      <SearchBar
        placeholder="Search Products"
        onChangeText={(v) => setSearch(v)}
      />
      <ListContainer<Product>
        loading={loading}
        data={products}
        onRefresh={fetchData}
        item={(item) => <ProductItem {...item} key={item._id} />}
      />
    </ContentWrapper>
  );
}
