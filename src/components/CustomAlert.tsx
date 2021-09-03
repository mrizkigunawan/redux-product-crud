import React from "react";
import { Alert, AlertIcon } from "@chakra-ui/react";

interface CustomAlertProps {
  message: string | null;
}

/*
 *  custom alert component
 */
export const CustomAlert: React.FC<CustomAlertProps> = ({ message }) => {
  return (
    <Alert status="error" my="2">
      <AlertIcon />
      {message}
    </Alert>
  );
};
