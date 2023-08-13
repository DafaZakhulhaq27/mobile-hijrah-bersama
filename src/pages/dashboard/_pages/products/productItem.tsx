import { Box, Button, Divider, Flex, Text, useToast } from "native-base";
import { useState } from "react";
import { createCart } from "../../../../api/cart";
import LabelValue from "../../../../components/labelValue";
import { Product } from "./types";

export default function ProductItem({
  _id,
  price,
  seat,
  program,
  isAddedCart,
  schedule,
}: Product) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [isCarted, setIsCarted] = useState(isAddedCart);

  const addToCart = async () => {
    setLoading(true);
    try {
      const res = await createCart({
        id_product: _id,
        qty: 1,
      });
      if (res.status) {
        toast.show({
          description: "Add to cart success",
        });
        setIsCarted(true);
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
          <LabelValue label="Seat" value={seat.toString()} />
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
        {!isCarted && (
          <Button mt="2" isLoading={loading} onPress={addToCart}>
            Add to Cart
          </Button>
        )}
      </Box>
      <Divider />
    </>
  );
}
