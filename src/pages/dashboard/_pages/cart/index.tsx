import { Button } from "native-base";
import { useEffect, useRef, useState } from "react";
import { getCarts } from "../../../../api/cart";
import { Cart } from "../../../../api/cart/model";
import {
  createOrder,
  getCurrentOrder,
  getOrderStatusCheck,
} from "../../../../api/order";
import { DataPayment } from "../../../../api/order/model";
import ContentWrapper from "../../../../components/contentWrapper";
import ListContainer from "../../../../components/list/container";
import Loading from "../../../../components/list/loading";
import { ORDER_ROUTE } from "../../../../navigation/routesNames";
import { CartRouteProps } from "../../../../navigation/types";
import CartItem from "./cartItem";

export default function CartScreen({ navigation }: CartRouteProps) {
  const [loading, setLoading] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [data, setData] = useState<Cart[]>([]);

  const [isOrderPending, setIsOrderPending] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const [loadingCheckStatus, setLoadingCheckStatus] = useState(false);
  const isMounted = useRef(true); // Add this useRef hook

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
        setPaymentLink(resCurrentOrder.link_payment);
      } else {
        setPaymentLink("");
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
      const res = await getOrderStatusCheck();
      if (res.status) {
        fetchCarts();
        alert("Order berhasil dibayar");
      } else {
        alert("Order belum dibayar");
      }
    } catch (err) {
      console.log(err, "err");
    } finally {
      setLoadingCheckStatus(false);
    }
  };

  useEffect(() => {
    return () => {
      isMounted.current = false; // Set to false when the component unmounts
    };
  }, []);

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
      if (isMounted.current) {
        if (res.status || res.message === "berhasil") {
          const dataPayment: DataPayment = JSON.parse(res.dataPayment.response);
          navigation.replace(ORDER_ROUTE, {
            redirect_url: dataPayment.redirect_url,
          });
        } else {
          alert(res.message);
        }
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
        <>
          <Button
            m={3}
            isLoading={loadingCheckStatus}
            onPress={fetchCekStatus}
            colorScheme="lime"
          >
            Check Payment Status Order
          </Button>
        </>
      ) : (
        !!data.length && (
          <Button m={3} isLoading={loadingOrder} onPress={order}>
            Order
          </Button>
        )
      )}
      {paymentLink ? (
        <Button
          mx={3}
          mb={3}
          onPress={() =>
            navigation.replace(ORDER_ROUTE, { redirect_url: paymentLink })
          }
          colorScheme="amber"
        >
          how to pay
        </Button>
      ) : null}

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
