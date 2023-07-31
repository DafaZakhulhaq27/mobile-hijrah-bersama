import { Box, Center, Flex, Heading, Image } from "native-base";
import { ReactNode } from "react";
import { Logo } from "../../../assets";
import ContentWrapper from "../../components/contentWrapper";

type Props = {
  children: ReactNode;
  title: string;
  subtitle: string;
};

export default function LayoutAuth({ children, title, subtitle }: Props) {
  return (
    <ContentWrapper>
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="flex-end"
          >
            <Box>
              <Heading
                size="lg"
                fontWeight="600"
                color="coolGray.800"
                _dark={{
                  color: "warmGray.50",
                }}
              >
                {title}
              </Heading>
              <Heading
                mt="1"
                _dark={{
                  color: "warmGray.200",
                }}
                color="coolGray.600"
                fontWeight="medium"
                size="xs"
                mb="0"
              >
                {subtitle}
              </Heading>
            </Box>
            <Image source={Logo} alt="Alternate Text" size="sm" />
          </Flex>
          {children}
        </Box>
      </Center>
    </ContentWrapper>
  );
}
