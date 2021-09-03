import React from "react";
import { Box, Text } from "@chakra-ui/react";

import { ContentContainer } from "../components/Container";

/*
 *  custom header component
 */
export const Header: React.FC = () => {
  return (
    <Box w="100%" h="60" py="16" bgGradient="linear(to-r, teal.500, blue.500)">
      <ContentContainer>
        <Text
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight={{ base: "600", lg: "700" }}
          color="white"
        >
          Manage Products
        </Text>
      </ContentContainer>
    </Box>
  );
};
