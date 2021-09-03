import React, { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

interface CardFooterProps {
  children: ReactNode;
  justifyContent?: string;
}

/*
 *  custom card footer component
 */
export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  justifyContent = "space-between",
}) => {
  return (
    <Flex alignItems="center" justify={justifyContent} p="5">
      {children}
    </Flex>
  );
};
