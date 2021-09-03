import React from "react";
import { Button } from "@chakra-ui/react";
import { AiOutlinePicture } from "react-icons/ai";

interface InputFileProps {
  isDisabled: boolean;
  onChangeFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/*
 *  custom button component for uploading image/picture
 */
export const InputFile: React.FC<InputFileProps> = ({
  isDisabled,
  onChangeFile,
}) => {
  return (
    <Button
      rightIcon={<AiOutlinePicture />}
      colorScheme="gray"
      variant="ghost"
      position="relative"
      isDisabled={isDisabled}
      isFullWidth
    >
      Upload Photo
      {/* set the input tag to 0 opacity, input still works */}
      <input
        type="file"
        onChange={onChangeFile}
        disabled={isDisabled}
        style={{
          position: "absolute",
          opacity: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </Button>
  );
};
