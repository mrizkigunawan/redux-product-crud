import React, { ReactNode } from "react";
import { Box } from "@chakra-ui/react";

interface CardBodyProps {
  children: ReactNode;
}

/*
 *  custom card body component
 */
export const CardBody: React.FC<CardBodyProps> = ({ children }) => {
  return (
    <Box p="5" overflow="hidden">
      {children}
    </Box>
  );
};
