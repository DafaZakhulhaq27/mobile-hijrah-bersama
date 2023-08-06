import { Button } from "native-base";
import ContentWrapper from "../../../components/contentWrapper";
import CartItem from "./cartItem";

const dummyData = {
  _id: "xxx",
  product: {
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
  },
};

export default function CartScreen() {
  return (
    <ContentWrapper>
      <CartItem {...dummyData} />
      <Button mt="5" mx={3}>
        Checkout
      </Button>
    </ContentWrapper>
  );
}
