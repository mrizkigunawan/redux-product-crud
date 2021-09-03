import { Box, Text } from "@chakra-ui/react";
import React from "react";

/*
 *  custom footer component
 */
export const Footer: React.FC = () => {
  return (
    <Box as="footer" py="8" textAlign="center">
      <Text fontSize="x-small" color="teal.400">
        &copy; 2021 Gunawan
      </Text>
    </Box>
  );
};
