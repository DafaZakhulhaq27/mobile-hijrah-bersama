import { Button } from "native-base";
import { useEffect, useState } from "react";
import { getCarts } from "../../../../api/cart";
import { Cart } from "../../../../api/cart/model";
import { createOrder } from "../../../../api/order";
import ContentWrapper from "../../../../components/contentWrapper";
import ListContainer from "../../../../components/list/container";
import { CartRouteProps } from "../../../../navigation/types";
import CartItem from "./cartItem";

export default function CartScreen({ navigation }: CartRouteProps) {
  const [loading, setLoading] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [data, setData] = useState<Cart[]>([]);

  const fetchCarts = async () => {
    setLoading(true);
    try {
      const res = await getCarts({
        limit: "9999",
        page: "1",
      });
      if (res.data) {
        setData(res.data);
      } else {
        setData([]);
      }
    } catch (err) {
      console.log(err, "err");
    } finally {
      setLoading(false);
    }
  };

  const order = async () => {
    const totalAmount = data.reduce(
      (total, item) => total + item.product.price,
      0
    );
    const orderDetail = data.map((item) => ({
      product_id: item.product._id,
      qty: 1,
      price: item.product.price,
      amount: item.product.price * 1, // qty is 1
    }));

    try {
      const res = await createOrder({
        amount: totalAmount,
        order_detail: orderDetail,
      });
      console.log();
    } catch (err) {
      console.log(err, "err");
    } finally {
      setLoading(false);
    }

    // const token = await SecureStore.getItemAsync("token");
    // setLoadingOrder(true);
    // await fetcher
    //   .post(
    //     `/v1/checkout/process_transaction`,
    //     {
    //       amount: totalAmount,
    //       order_detail: orderDetail,
    //     },
    //     {
    //       headers: { Authorization: `Bearer ${token}` },
    //     }
    //   )
    //   .then(async ({ data }) => {
    //     console.log(data);
    //     if (data.message === 'berhasil') {
    //     } else {
    //       alert(data.message);
    //     }
    //   })
    //   .catch((err) => {
    //     if (err.response.data.message) {
    //       alert(err.response.data.message);
    //     }
    //   })
    //   .finally(() => setLoadingOrder(false));
    // navigation.push(ORDER_ROUTE, {
    //   redirect_url:
    //     "https://app.sandbox.midtrans.com/snap/v3/redirection/2f911c8a-bc59-437f-870b-8501c838d9ac",
    // });
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  return (
    <ContentWrapper>
      <Button m={3} isLoading={loadingOrder} onPress={order}>
        Order
      </Button>
      <ListContainer<Cart>
        loading={loading}
        data={data}
        onRefresh={fetchCarts}
        item={(item) => (
          <CartItem callbackDelete={fetchCarts} {...item} key={item._id} />
        )}
      />
    </ContentWrapper>
  );
}
