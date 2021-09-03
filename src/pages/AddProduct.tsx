import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import { Text, useToast } from "@chakra-ui/react";

import { ProductForm } from "../layouts/ProductForm";
import { Wrapper } from "../components/Wrapper";
import { Card } from "../components/Card";
import { ContentContainer } from "../components/Container";
import { CardHeader } from "../components/CardHeader";
import { CardBody } from "../components/CardBody";
import { CustomAlert } from "../components/CustomAlert";
import { actionCreators, StoreState } from "../state";
import { ProductState } from "../ts/types";

/*
 *  add product page compoent
 */
export const AddProduct: React.FC = () => {
  // get product state from store
  const { success, errors }: ProductState = useSelector<
    StoreState,
    StoreState["product"]
  >((state) => state.product);

  // react-router-dom hooks
  const history = useHistory();

  // chakra-ui hooks for showing toast
  const toast = useToast();

  // react-redux hooks
  const dispatch = useDispatch();

  // bind action creators
  const { unsetSuccess } = bindActionCreators(actionCreators, dispatch);

  // show toast when there's a complete action from creating product
  useEffect(() => {
    if (success) {
      toast({
        title: "Product " + success,
        description: "We've " + success + " new product!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      unsetSuccess();
    }
  }, [success, toast, unsetSuccess]);

  // handle "back" click, go to home component
  const handleClickBack = () => {
    history.goBack();
  };

  return (
    <Wrapper>
      <ContentContainer>
        <Card>
          {/* card header */}
          <CardHeader>
            <Text
              fontSize="lg"
              fontWeight={{ base: "500", lg: "600" }}
              color="gray.700"
            >
              Add Product
            </Text>
          </CardHeader>

          {/* card body */}
          <CardBody>
            {/* showing error */}
            {errors && <CustomAlert message={errors.message} />}

            {/* form add product */}
            <ProductForm onClickBack={handleClickBack} />
          </CardBody>
        </Card>
      </ContentContainer>
    </Wrapper>
  );
};
