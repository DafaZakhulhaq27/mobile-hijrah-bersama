import { Box, Button, Divider, Flex, Text, useToast } from "native-base";
import { useEffect, useRef, useState } from "react";
import { deleteCart } from "../../../../api/cart";
import { Cart } from "../../../../api/cart/model";
import LabelValue from "../../../../components/labelValue";

type Props = {
  callbackDelete: () => void;
} & Cart;

export default function CartItem({ _id, product, callbackDelete }: Props) {
  const { program, seat, price, schedule } = product;

  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const isMounted = useRef(true); // Add this useRef hook

  useEffect(() => {
    return () => {
      isMounted.current = false; // Set to false when the component unmounts
    };
  }, []);

  const deleteItem = async () => {
    setLoading(true);
    try {
      const res = await deleteCart(_id);
      if (isMounted.current) {
        // Check if component is still mounted
        if (res.status) {
          toast.show({
            description: "delete cart success",
          });
          callbackDelete();
        }
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Divider />
      <Box m={3}>
        <Flex flexDirection="row" flexWrap="wrap" mb={2}>
          <LabelValue label="Program" value={program} />
          <LabelValue label="Seat" value={seat} />
          <LabelValue label="Price" value={`$${price.toLocaleString()}`} />
        </Flex>
        <LabelValue
          label="Schedule"
          value={
            <>
              {schedule.map((item, index) => (
                <Text key={index}>
                  {index + 1}. {item.date} | {item.code_flight_schedule} |{" "}
                  {item.boarding_passcode} | {item.departure_time} |{" "}
                  {item.arrived_time}
                </Text>
              ))}
            </>
          }
        />
        <Button
          mt="2"
          colorScheme="danger"
          onPress={deleteItem}
          isLoading={loading}
        >
          Remove Item
        </Button>
      </Box>
      <Divider />
    </>
  );
}
