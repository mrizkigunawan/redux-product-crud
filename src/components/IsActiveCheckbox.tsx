import React, { useState, useRef } from "react";
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
  Checkbox,
  FormControl,
  FormLabel,
  GridItem,
  Skeleton,
} from "@chakra-ui/react";

import { actionCreators, StoreState } from "../state";
import { ProductState } from "../ts/types";

/*
 *  custom checkbox component
 *  deactivate/activate product
 *  show alert dialog on click
 */
export const IsActiveCheckbox: React.FC = () => {
  // state for alert dialog
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // ref for alert dialog
  const cancelRef = useRef(null);

  // react-redux hooks
  const dispatch = useDispatch();

  // get product state from store
  const { product, isLoading }: ProductState = useSelector<
    StoreState,
    StoreState["product"]
  >((state) => state.product);

  // bind action creators
  const { editProduct } = bindActionCreators(actionCreators, dispatch);

  // handle "close" click button on alert dialog
  const onClose = () => setIsOpen(false);

  // handle "deactivate/inactivate" confirmation on alert dialog
  const onConfirmHandle = () => {
    setIsOpen(false);

    const updatedProduct = {
      ...product,
      isActive: !product.isActive,
    };

    editProduct(updatedProduct);
  };

  return (
    <>
      <GridItem order={{ base: 3, md: 4 }} colSpan={{ base: 2, lg: "auto" }}>
        {/* check box */}
        <FormControl id="isActive" onClick={() => setIsOpen(true)}>
          <FormLabel>Product Active</FormLabel>
          <Skeleton isLoaded={!isLoading}>
            <Checkbox defaultChecked={product.isActive || false} isReadOnly>
              {product.isActive ? "Active" : "Inactive"}
            </Checkbox>
          </Skeleton>
        </FormControl>
      </GridItem>

      {/* alert dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {product.isActive ? "Deactivate" : "Activate"} Product
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can change it later.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme={product.isActive ? "red" : "blue"}
                onClick={onConfirmHandle}
                ml={3}
              >
                {product.isActive ? "Deactivate" : "Activate"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
