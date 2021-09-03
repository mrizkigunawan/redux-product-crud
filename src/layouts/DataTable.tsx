import { useSelector } from "react-redux";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Image,
  Flex,
  Stack,
  IconButton,
  Skeleton,
  Badge,
} from "@chakra-ui/react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import usePagination from "../hooks/usePagination";
import { ProductModal } from "./ProductModal";
import { CardFooter } from "../components/CardFooter";
import { DeleteProductButton } from "../components/DeleteProductButton";
import { TABLE_HEADINGS } from "../constant";
import { StoreState } from "../state";
import { AllProductState } from "../ts/types";

/*
 *  custom datatable component
 */
export const DataTable: React.FC = () => {
  // get all products state from store
  const { products, totalPages, isLoading }: AllProductState = useSelector<
    StoreState,
    StoreState["allProducts"]
  >((state) => state.allProducts);

  // destructuring custom hooks state for managing pagination
  const {
    documents,
    firstDocNumber,
    currentPage,
    isNextPageAvailable,
    isPreviousPageAvailable,
    onNextPageClick,
    onPreviousPageClick,
  } = usePagination({ products, totalPages });

  return (
    <>
      <Box overflowX="auto">
        {/* show skeleton box on page loading */}
        <Skeleton isLoaded={!isLoading}>
          <Table>
            <Thead>
              <Tr fontSize="sm">
                {/* mapping table headings */}
                {TABLE_HEADINGS.map((heading, key) => (
                  <Th key={key}>
                    <Text align="center">{heading}</Text>
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {/* mapping documents */}
              {documents.map((data, idx) => (
                <Tr key={data.id} fontSize="smaller" color="gray.600">
                  <Td>
                    <Text align="center">{firstDocNumber + idx}</Text>
                  </Td>
                  <Td minW="52">
                    <Flex alignItems="center">
                      <Image
                        borderRadius="full"
                        boxSize="40px"
                        mr="4"
                        src={data.picture}
                        alt={data.name}
                      />
                      <Text>{data.name}</Text>
                    </Flex>
                  </Td>
                  <Td minW="20">
                    <Text align="center">{data.qty}</Text>
                  </Td>
                  <Td minW="40">{new Date(data.expiredAt).toDateString()}</Td>
                  <Td justifySelf="center" minW="32">
                    <Text align="center">
                      {data.isActive ? (
                        <Badge colorScheme="green">Aktif</Badge>
                      ) : (
                        <Badge>Tidak Aktif</Badge>
                      )}
                    </Text>
                  </Td>
                  <Td>
                    {/* delete row button */}
                    <DeleteProductButton productId={data.id} />

                    {/* edit button - show modal dialog on click */}
                    <ProductModal id={data.id} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr fontSize="sm">
                {/* mapping table footer headings */}
                {TABLE_HEADINGS.map((heading, key) => (
                  <Th key={key}>
                    <Text align="center">{heading}</Text>
                  </Th>
                ))}
              </Tr>
            </Tfoot>
          </Table>
        </Skeleton>
      </Box>

      <CardFooter>
        <Text fontSize={{ base: "x-small", md: "smaller" }} color="gray.400">
          Total: {products.length} Products
        </Text>
        <Stack spacing={2} direction="row" align="center">
          {/* previous page button */}
          <IconButton
            colorScheme="blue"
            size="sm"
            variant="ghost"
            aria-label="previous page"
            isDisabled={!isPreviousPageAvailable}
            onClick={onPreviousPageClick}
            icon={<AiOutlineLeft />}
          />
          <Text fontSize="smaller" color="gray.400">
            {currentPage}
          </Text>
          {/* next page button */}
          <IconButton
            colorScheme="blue"
            size="sm"
            variant="ghost"
            aria-label="next page"
            isDisabled={!isNextPageAvailable}
            onClick={onNextPageClick}
            icon={<AiOutlineRight />}
          />
        </Stack>
      </CardFooter>
    </>
  );
};
