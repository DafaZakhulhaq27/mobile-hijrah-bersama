import { MaterialIcons } from "@expo/vector-icons";
import { Icon, Input } from "native-base";
import { InterfaceInputProps } from "native-base/lib/typescript/components/primitives/Input/types";

export default function SearchBar(props: InterfaceInputProps) {
  return (
    <Input
      width="100%"
      borderRadius="4"
      py="3"
      px="1"
      fontSize="14"
      InputLeftElement={
        <Icon
          m="2"
          ml="3"
          size="6"
          color="gray.400"
          as={<MaterialIcons name="search" />}
        />
      }
      {...props}
    />
  );
}
