import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

import { actionCreators, StoreState } from "../state";
import { ProductState } from "../ts/types";

interface FormSubmitButtonProps {
  editMode?: boolean;
  getFormValue: () => {
    getValue: (key: string) => string | number;
    picture: string;
  };
  onRemoveFile?: () => void;
}

/*
 *  custom submit button component
 *  form submit buttons - save / update
 */
export const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({
  editMode = false,
  getFormValue,
  onRemoveFile,
}) => {
  // state for alert dialog
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // ref for alert dialog
  const cancelRef = useRef(null);

  // get product state from store
  const { isLoading, product }: ProductState = useSelector<
    StoreState,
    StoreState["product"]
  >((state) => state.product);

  // react-redux hooks
  const dispatch = useDispatch();

  // bind action creators
  const { editProduct } = bindActionCreators(actionCreators, dispatch);

  // toggle alert dialog open/close
  const toggleAlert = () => setIsOpen(!isOpen);

  // handle "update" alert dialog confirmatin
  // handle update product
  const onUpdateConfirmClick = () => {
    const name: string = getFormValue().getValue("name") as string;
    const qty: number = +getFormValue().getValue("qty");
    const expiredAt: string = getFormValue().getValue("expiredAt") as string;
    const picture: string = getFormValue().picture;

    const updatedProduct = { ...product, name, qty, expiredAt, picture };

    onRemoveFile?.();
    editProduct(updatedProduct);
    setIsOpen(!isOpen);
  };

  return (
    <>
      {editMode ? (
        // button update for edit product mode
        <Button
          colorScheme="blue"
          variant="solid"
          ml="4"
          onClick={toggleAlert}
          type="button"
          isLoading={isLoading}
          loadingText="Updating"
        >
          Update
        </Button>
      ) : (
        // button update for edit product mode
        <Button
          colorScheme="blue"
          variant="solid"
          ml="4"
          type="submit"
          isLoading={isLoading}
          loadingText="Saving"
        >
          Save
        </Button>
      )}

      {/* alert dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={toggleAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Update Product
            </AlertDialogHeader>

            <AlertDialogBody>Are you sure?</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={toggleAlert}>
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={onUpdateConfirmClick} ml={3}>
                Update
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
