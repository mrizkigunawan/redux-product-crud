import { ActionType } from "../enums";
import { Product } from "../types";

/*
 *  actions interface
 */
export interface FetchProductsAction {
  type: ActionType.FETCH_PRODUCTS_SUCCESS;
  payload: {
    products: Product[];
    totalPages: number;
  };
}

export interface AddProductAction {
  type: ActionType.ADD_PRODUCT_SUCCESS;
  payload: {
    success: string;
  };
}

export interface SetProductAction {
  type: ActionType.SET_PRODUCT_SUCCESS;
  payload: Product;
}

export interface UnsetProductAction {
  type: ActionType.UNSET_PRODUCT;
}

export interface UnsetSuccessAction {
  type: ActionType.UNSET_SUCCESS;
}

export interface EditProductAction {
  type: ActionType.EDIT_PRODUCT;
  payload: {
    product: Product;
    success: string;
  };
}

export interface DeleteProductAction {
  type: ActionType.DELETE_PRODUCT;
  payload: {
    success: string;
  };
}

export interface ProductFailAction {
  type: ActionType.SET_PRODUCT_FAIL;
  payload: ErrorInterface;
}

export interface FetchProductFailAction {
  type: ActionType.FETCH_PRODUCTS_FAIL;
  payload: ErrorInterface;
}

export interface FetchProductsRequestAction {
  type: ActionType.FETCH_PRODUCTS_REQUEST;
}

export interface ProductRequestAction {
  type: ActionType.SET_PRODUCT_REQUEST;
}

export interface ClearErrorAction {
  type: ActionType.CLEAR_ERRORS;
}

export interface ErrorInterface {
  message: string;
}
