import { useEffect, useState } from "react";
import { PRODUCTS_PER_PAGE } from "../constant";
import { Product } from "../ts/types";

interface UsePaginationProps {
  products: Product[];
  totalPages: number;
}

/*
 *  custom hooks for handling pagination and documents
 */
const usePagination = ({ products, totalPages }: UsePaginationProps) => {
  const [documents, setDocuments] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [firstDocNumber, setFirstDocNumber] = useState<number>(1);
  const [isNextPageAvailable, setIsNextPageAvailable] =
    useState<boolean>(false);
  const [isPreviousPageAvailable, setIsPreviousPageAvailable] =
    useState<boolean>(false);

  // run only on first mount
  useEffect(() => {
    if (products.length) {
      setDocuments(products.slice(0, 10));
      setIsNextPageAvailable(1 < totalPages);
    }

    // clean up everything on onmount
    return () => {
      setDocuments([]);
      setCurrentPage(1);
      setFirstDocNumber(1);
      setIsNextPageAvailable(false);
      setIsPreviousPageAvailable(false);
    };
  }, [products, totalPages]);

  // handle pagination and documents on page changed (currentpage changed)
  const onPageChange = (pageNum: number) => {
    if (products.length) {
      let firstDocIndex: number = (pageNum - 1) * PRODUCTS_PER_PAGE;
      let LastDocIndex: number = pageNum * PRODUCTS_PER_PAGE;

      setDocuments(products.slice(firstDocIndex, LastDocIndex));
      setIsNextPageAvailable(pageNum < totalPages);
      setIsPreviousPageAvailable(pageNum > 1);
      setCurrentPage(pageNum);
      setFirstDocNumber((pageNum - 1) * PRODUCTS_PER_PAGE + 1);
    }
  };

  // handler when next page button clicked
  const onNextPageClick = () => {
    const nextPageNum = isNextPageAvailable ? currentPage + 1 : currentPage;
    onPageChange(nextPageNum);
  };

  // handle when prev page button clicked
  const onPreviousPageClick = () => {
    const previousPageNum = isPreviousPageAvailable
      ? currentPage - 1
      : currentPage;
    onPageChange(previousPageNum);
  };

  // returns
  return {
    documents,
    firstDocNumber,
    currentPage,
    isNextPageAvailable,
    isPreviousPageAvailable,
    onNextPageClick,
    onPreviousPageClick,
  };
};

export default usePagination;
