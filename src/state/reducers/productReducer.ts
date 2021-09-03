import { Action, Product, ProductState } from "../../ts/types";
import { ActionType } from "../../ts/enums";

const initialState: ProductState = {
  product: {} as Product,
  isLoading: false,
  errors: null,
  success: "",
};

const reducer = (state: ProductState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.SET_PRODUCT_SUCCESS:
      return {
        ...state,
        product: action.payload,
        isLoading: false,
        errors: null,
      };
    case ActionType.EDIT_PRODUCT:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        errors: null,
      };
    case ActionType.UNSET_PRODUCT:
      return {
        ...state,
        product: {},
        isLoading: true,
        errors: null,
      };
    case ActionType.ADD_PRODUCT_SUCCESS:
    case ActionType.DELETE_PRODUCT:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        errors: null,
      };
    case ActionType.SET_PRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
        errors: null,
      };
    case ActionType.SET_PRODUCT_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
      };
    case ActionType.UNSET_SUCCESS:
      return {
        ...state,
        success: "",
      };
    case ActionType.CLEAR_ERRORS:
      return {
        ...state,
        errors: null,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
