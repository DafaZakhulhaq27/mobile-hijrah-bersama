import { Text } from "native-base";
import ContentWrapper from "../../../components/contentWrapper";
import { ProductsRouteProps } from "../../../navigation/types";
import Category from "./category";
import ProductItem from "./productItem";

const dummyData = {
  _id: "xxx",
  schedule: [
    {
      date: "xxx", // 1-aug
      code_flight_schedule: "xxx", // WY-850
      boarding_passcode: "xxx", // CGKMCT
      departure_time: "xxx", // 14:50
      arrived_time: "xxx", // 15:50
    },
  ],
  seat: 40,
  program: "xxx", // 10D
  price: 1000, // USD
  category: {
    _id: "xxx",
    icon: "xxx",
    name: "xxx",
  },
  is_added_cart: false,
  is_sold: false, // default false
};

export default function ProductsScreen({
  route,
  navigation,
}: ProductsRouteProps) {
  return (
    <ContentWrapper>
      {route.params ? (
        <Category icon={route.params.icon} name={route.params.name} />
      ) : (
        <Text mx={3} my={2} fontWeight="bold">
          All Products :
        </Text>
      )}
      <ProductItem {...dummyData} />
    </ContentWrapper>
  );
}
