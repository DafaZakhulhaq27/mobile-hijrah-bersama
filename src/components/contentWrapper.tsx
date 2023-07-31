import { Box } from "native-base";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ContentWrapper({ children }: Props) {
  return (
    <Box backgroundColor="white" minH="full">
      {children}
    </Box>
  );
}
