import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { AiOutlineSearch } from "react-icons/ai";
import { InputGroup, Input, InputRightElement } from "@chakra-ui/react";

import { actionCreators } from "../state";

interface InputSearchProps {
  keyword: string;
  onChangeKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/*
 *  Input Search component
 */
export const InputSearch: React.FC<InputSearchProps> = ({
  keyword,
  onChangeKeyword,
}) => {
  // react-redux hooks
  const dispatch = useDispatch();

  // bind action creators
  const { fetchProducts } = bindActionCreators(actionCreators, dispatch);

  // handle "enter" on form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchProducts(keyword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputGroup maxW={{ base: "auto", md: "60" }}>
        <Input
          placeholder="search products"
          value={keyword}
          onChange={onChangeKeyword}
        />
        <InputRightElement children={<AiOutlineSearch color="gray.300" />} />
      </InputGroup>
    </form>
  );
};
