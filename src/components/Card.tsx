import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
}

/*
 *  custom card component
 */
export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <Box rounded="lg" bg="white" boxShadow="lg">
      {children}
    </Box>
  );
};
