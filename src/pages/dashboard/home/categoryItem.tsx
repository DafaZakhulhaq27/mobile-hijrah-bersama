import { Divider, Flex, Image, Text } from "native-base";
import { GestureResponderEvent, TouchableOpacity } from "react-native";

type Props = {
  onPress: (event: GestureResponderEvent) => void;
  icon: string;
  name: string;
};

export default function CategoryItem({ onPress, icon, name }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Flex m={3} flexDirection="row" justifyContent="space-between">
        <Flex flexDirection="row" alignItems="center">
          <Image
            mr={3}
            size={30}
            borderRadius={100}
            source={{
              uri: icon,
            }}
            alt="Alternate Text"
          />
          <Text mr={15}>{name}</Text>
        </Flex>
        {/* <MaterialIcons name="chevron-right" size={30} /> */}
      </Flex>
      <Divider />
    </TouchableOpacity>
  );
}
