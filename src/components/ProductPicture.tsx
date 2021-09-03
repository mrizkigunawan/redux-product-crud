import React from "react";
import { GridItem, Flex, Image } from "@chakra-ui/react";

interface ProductPictureProps {
  image: string;
}

/*
 *  custom image component
 *  show product picture on edit mode (on modal dialog)
 */
export const ProductPicture: React.FC<ProductPictureProps> = ({ image }) => {
  return (
    <GridItem colSpan={2}>
      <Flex justify="center">
        <Image
          w={{ base: "full", md: "200px" }}
          h="200px"
          rounded="lg"
          my="4"
          overflow="hidden"
          src={image}
          objectFit="cover"
          objectPosition="center"
          alt="product"
        />
      </Flex>
    </GridItem>
  );
};
