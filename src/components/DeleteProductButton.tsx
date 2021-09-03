import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { AiOutlineDelete } from "react-icons/ai";

import { actionCreators } from "../state";

interface DeleteProductButtonProps {
  productId: string;
}

/*
 *  custom delete button component
 *  delete row (DELETE)
 */
export const DeleteProductButton: React.FC<DeleteProductButtonProps> = ({
  productId,
}) => {
  // state for alert dialog
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // ref for alert dialog
  const cancelRef = useRef(null);

  // toggle alert dialog
  const toggleAlert = () => setIsOpen(!isOpen);

  // react-redux hooks
  const dispatch = useDispatch();

  // bind action creators
  const { deleteProduct, fetchProducts } = bindActionCreators(
    actionCreators,
    dispatch
  );

  // handle "delete" alert dialog confirmation - delete product
  const onClickDeleteHandle = (id: string) => {
    deleteProduct(id);

    // refresh products after deleting product
    fetchProducts("");
  };

  return (
    <>
      {/* delete button */}
      <IconButton
        onClick={toggleAlert}
        colorScheme="red"
        variant="ghost"
        aria-label="delete icon"
        icon={<AiOutlineDelete />}
        mr="2"
      />

      {/* alert dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={toggleAlert}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? the product will be deleted permanently. Instead,
              just deactivate this product on edit product section.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={toggleAlert}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => onClickDeleteHandle(productId)}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
