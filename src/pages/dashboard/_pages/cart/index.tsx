import { Button } from "native-base";
import { useEffect, useState } from "react";
import { getCarts } from "../../../../api/cart";
import { Cart } from "../../../../api/cart/model";
import { createOrder, getCurrentOrder } from "../../../../api/order";
import ContentWrapper from "../../../../components/contentWrapper";
import ListContainer from "../../../../components/list/container";
import Loading from "../../../../components/list/loading";
import { CartRouteProps } from "../../../../navigation/types";
import CartItem from "./cartItem";

export default function CartScreen({ navigation }: CartRouteProps) {
  const [loading, setLoading] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [data, setData] = useState<Cart[]>([]);

  const [isOrderPending, setIsOrderPending] = useState(false);
  const [loadingCheckStatus, setLoadingCheckStatus] = useState(false);

  const fetchCarts = async () => {
    setLoading(true);
    try {
      const res = await getCarts({
        limit: "9999",
        page: "1",
      });
      const resCurrentOrder = await getCurrentOrder();
      if (!resCurrentOrder.status) {
        setIsOrderPending(true);
      } else {
        setIsOrderPending(false);
      }

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

  const fetchCekStatus = async () => {
    setLoadingCheckStatus(true);
    try {
      const res = await getCurrentOrder();
      console.log(res, "res");
    } catch (err) {
      console.log(err, "err");
    } finally {
      setLoadingCheckStatus(false);
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
    setLoadingOrder(true);
    try {
      const res = await createOrder({
        amount: totalAmount,
        order_detail: orderDetail,
      });
      if (res.status || res.message === "berhasil") {
        alert("Order Berhasil Dibuat");
        fetchCarts();
      } else {
        alert(res.message);
      }
    } catch (err) {
      console.log(err, "err");
    } finally {
      setLoadingOrder(false);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <ContentWrapper>
      {isOrderPending ? (
        <Button
          m={3}
          isLoading={loadingCheckStatus}
          onPress={fetchCekStatus}
          colorScheme="lime"
        >
          Cek Payment Status Order
        </Button>
      ) : (
        !!data.length && (
          <Button m={3} isLoading={loadingOrder} onPress={order}>
            Order
          </Button>
        )
      )}

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
