import React, { ReactNode } from "react";
import { Container } from "@chakra-ui/react";

interface ContainerProps {
  children: ReactNode;
}

/*
 *  Content container component
 */
export const ContentContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <Container
      maxW={{
        base: "container.sm",
        md: "container.md",
        lg: "container.lg",
      }}
      mx="auto"
    >
      {children}
    </Container>
  );
};
