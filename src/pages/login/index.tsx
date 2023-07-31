import { Button, Container, Text } from "native-base";
import { HOME_ROUTE } from "../../navigation/routesNames";
import { LoginRouteProps } from "../../navigation/types";

export default function LoginScreen({ navigation }: LoginRouteProps) {
  return (
    <Container>
      <Text>Login</Text>
      <Button onPress={() => navigation.push(HOME_ROUTE)}>Home</Button>
    </Container>
  );
}
