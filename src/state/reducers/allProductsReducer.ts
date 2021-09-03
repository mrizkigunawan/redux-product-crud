import { Action, AllProductState } from "../../ts/types";
import { ActionType } from "../../ts/enums";

const initialState: AllProductState = {
  products: [],
  isLoading: false,
  errors: null,
  totalPages: 0,
};

const reducer = (state: AllProductState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload.products,
        totalPages: action.payload.totalPages,
        isLoading: false,
        errors: null,
      };
    case ActionType.FETCH_PRODUCTS_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    case ActionType.FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        products: [],
        isLoading: true,
        errors: null,
      };
    default:
      return state;
  }
};

export default reducer;
