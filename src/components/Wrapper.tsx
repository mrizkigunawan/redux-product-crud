import { Box } from "@chakra-ui/react";
import { ReactNode } from "react";

interface WrapperProps {
  children: ReactNode;
}

/*
 *  Content wrapper component
 */
export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <Box mt={{ base: "-28", md: "-24", lg: "-20" }}>{children}</Box>;
};
