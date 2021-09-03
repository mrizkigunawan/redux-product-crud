import {
  useDisclosure,
  IconButton,
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  ModalHeader,
  Progress,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { AiOutlineEdit } from "react-icons/ai";
import { actionCreators, StoreState } from "../state";
import { ProductForm } from "./ProductForm";
import { ProductState } from "../ts/types";
import { CustomAlert } from "../components/CustomAlert";

interface ProductModalProp {
  id: string;
}

/*
 *  modal components for showing product detail
 */
export const ProductModal: React.FC<ProductModalProp> = ({ id }) => {
  // chakra-ui custom hooks for handling dialog
  const { isOpen, onOpen, onClose } = useDisclosure();

  // destructing store state
  const { product, isLoading, errors }: ProductState = useSelector<
    StoreState,
    StoreState["product"]
  >((state) => state.product);

  const dispatch = useDispatch();
  const { setProduct } = bindActionCreators(actionCreators, dispatch);

  useEffect(() => {
    if (isOpen) {
      setProduct(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <>
      <IconButton
        onClick={onOpen}
        icon={<AiOutlineEdit />}
        colorScheme="blue"
        variant="ghost"
        size="sm"
        aria-label="edit icon"
      />

      {/* modal dialog */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <Progress size="xs" isIndeterminate={isLoading} />
          <ModalBody>
            {errors && <CustomAlert message={errors.message} />}
            <ProductForm onClickBack={onClose} product={product} editMode />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
