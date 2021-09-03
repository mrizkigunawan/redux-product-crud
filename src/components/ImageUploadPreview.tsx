import React from "react";
import { Image, Button } from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";

interface ImageUploadPreviewProps {
  previewUrl: string;
  onRemoveFile: () => void;
}

/*
 *  custom image/picture preview component
 */
export const ImageUploadPreview: React.FC<ImageUploadPreviewProps> = ({
  previewUrl,
  onRemoveFile,
}) => {
  return (
    <>
      <Image
        w="full"
        h="auto"
        rounded="lg"
        my="4"
        overflow="hidden"
        src={previewUrl}
        objectFit="cover"
        objectPosition="center"
        alt="product"
      />
      <Button
        rightIcon={<AiOutlineDelete />}
        colorScheme="red"
        variant="ghost"
        onClick={onRemoveFile}
      >
        Remove Photo
      </Button>
    </>
  );
};
