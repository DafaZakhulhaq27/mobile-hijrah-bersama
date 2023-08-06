import { Box, Button, Divider, Flex, Text } from "native-base";
import LabelValue from "../../../components/labelValue";

type Schedule = {
  date: string;
  code_flight_schedule: string;
  boarding_passcode: string;
  departure_time: string;
  arrived_time: string;
};

type Props = {
  _id: string;
  program: string;
  price: number;
  seat: number;
  is_sold: boolean;
  is_added_cart: boolean;
  schedule: Schedule[];
};

export default function ProductItem({
  _id,
  price,
  seat,
  program,
  is_added_cart,
  schedule,
}: Props) {
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
