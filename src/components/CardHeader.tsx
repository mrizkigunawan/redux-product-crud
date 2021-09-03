import React, { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

interface CardHeaderProps {
  children: ReactNode;
}

/*
 *  custom card header component
 */
export const CardHeader: React.FC<CardHeaderProps> = ({ children }) => {
  return (
    <Flex
      alignItems={{ base: "start", md: "center" }}
      justify="space-between"
      direction={{ base: "column", md: "row" }}
      p="5"
    >
      {children}
    </Flex>
  );
};
