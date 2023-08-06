import { Box, Text } from "native-base";
import { ReactNode } from "react";

type Props = {
  label: string;
  value: string | ReactNode;
};

export default function LabelValue({ label, value }: Props) {
  return (
    <Box my="0.5" mr="4">
      <Text fontSize="2xs" fontWeight="bold">
        {label}
      </Text>
      {typeof value === "string" ? <Text fontSize="md">{value}</Text> : value}
    </Box>
  );
}
