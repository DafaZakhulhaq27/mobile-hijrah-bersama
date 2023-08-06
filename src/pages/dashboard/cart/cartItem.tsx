import { Box, Button, Divider, Flex, Text } from "native-base";
import LabelValue from "../../../components/labelValue";
import { Product } from "../../../models/cart";

type Props = {
  _id: string;
  product: Product;
};

export default function CartItem({ _id, product }: Props) {
  const { program, seat, price, schedule } = product;

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
        <Button mt="2" colorScheme="danger">
          Remove Item
        </Button>
      </Box>
      <Divider />
    </>
  );
}
