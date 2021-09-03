import React, { useEffect, useState } from "react";
import { Flex, Button, Text, useToast, IconButton } from "@chakra-ui/react";
import { AiOutlinePlus, AiOutlineReload } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";

import { DataTable } from "../layouts/DataTable";
import { ContentContainer } from "../components/Container";
import { Wrapper } from "../components/Wrapper";
import { Card } from "../components/Card";
import { CardHeader } from "../components/CardHeader";
import { InputSearch } from "../components/InputSearch";
import { CardBody } from "../components/CardBody";
import { CustomAlert } from "../components/CustomAlert";
import { actionCreators, StoreState } from "../state";
import { AllProductState, ProductState } from "../ts/types";

/*
 *  home page component
 */
export const Home: React.FC = () => {
  // state for input search keyword
  const [keyword, setKeyword] = useState<string>("");

  // react-router-dom hooks
  const history = useHistory();

  // chakra-ui hooks for showing toast
  const toast = useToast();

  // react-redux hooks
  const dispatch = useDispatch();

  // get product state from store
  const { success, errors }: ProductState = useSelector<
    StoreState,
    StoreState["product"]
  >((state) => state.product);

  // get all products state from store
  const { errors: fetchErrors }: AllProductState = useSelector<
    StoreState,
    StoreState["allProducts"]
  >((state) => state.allProducts);

  // bind action creators
  const { fetchProducts, unsetSuccess } = bindActionCreators(
    actionCreators,
    dispatch
  );

  // run only on first page/component mount
  useEffect(() => {
    fetchProducts("");

    // preventing page refresh every change made
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // show toast when there's a complete action from manage product
  useEffect(() => {
    if (success) {
      toast({
        title: "Product " + success,
        description: "We've " + success + " the product!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      unsetSuccess();
    }
  }, [success, toast, unsetSuccess]);

  // handle on click reload page
  const handleReload = () => {
    fetchProducts(keyword);
  };

  // handle on keyword change
  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);

  // handle "add" click, go to "/add" page component
  const handleAddBtnClick = () => {
    history.push("/add");
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
              mb={{ base: "4", md: "0" }}
            >
              Products Data
            </Text>

            <Flex
              alignItems="center"
              justify={{ base: "center", md: "end" }}
              w={{ base: "full", md: "auto" }}
            >
              {/* reload icon */}
              <IconButton
                icon={<AiOutlineReload />}
                colorScheme="blue"
                variant="ghost"
                aria-label="reload page"
                mr="3"
                onClick={handleReload}
              />
              {/* search input */}
              <InputSearch
                keyword={keyword}
                onChangeKeyword={handleKeywordChange}
              />
              {/* "+ add" button */}
              <Button
                leftIcon={<AiOutlinePlus />}
                colorScheme="blue"
                variant="solid"
                ml="3"
                w={{ base: "50%", md: "auto" }}
                onClick={handleAddBtnClick}
              >
                Add
              </Button>
            </Flex>
          </CardHeader>

          {/* cardbody - showing errors */}
          <CardBody>
            {fetchErrors && <CustomAlert message={fetchErrors.message} />}
            {errors && <CustomAlert message={errors.message} />}
          </CardBody>

          {/* table */}
          <DataTable />
        </Card>
      </ContentContainer>
    </Wrapper>
  );
};
