import { Box, Button, Divider, Flex, Text } from "native-base";
import LabelValue from "../../../components/labelValue";
import { Product } from "../../../models/cart";

export default function ProductItem({
  _id,
  price,
  seat,
  program,
  is_added_cart,
  schedule,
}: Product) {
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
        {!is_added_cart && <Button mt="2">Add to Cart</Button>}
      </Box>
      <Divider />
    </>
  );
}
