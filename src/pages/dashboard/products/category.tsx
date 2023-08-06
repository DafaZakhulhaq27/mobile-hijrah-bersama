import { Divider, Flex, Image, Text } from "native-base";

type Props = {
  icon: string;
  name: string;
};

export default function Category({ icon, name }: Props) {
  return (
    <>
      <Text mx={3} mt={1} fontWeight="bold">
        Category :
      </Text>
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
      <Divider h="1.5" />
    </>
  );
}
