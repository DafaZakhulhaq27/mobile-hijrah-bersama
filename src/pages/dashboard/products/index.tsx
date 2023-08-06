import { Box, Text } from "native-base";
import { ProductsRouteProps } from "../../../navigation/types";

export default function ProductsScreen({
  route,
  navigation,
}: ProductsRouteProps) {
  console.log(route.params);

  return (
    <Box>
      <Text>Products</Text>
    </Box>
  );
}
