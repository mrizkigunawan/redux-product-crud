import {
  FetchProductsAction,
  SetProductAction,
  UnsetProductAction,
  EditProductAction,
  ProductFailAction,
  FetchProductFailAction,
  FetchProductsRequestAction,
  ProductRequestAction,
  ErrorInterface,
  AddProductAction,
  UnsetSuccessAction,
  DeleteProductAction,
  ClearErrorAction,
} from "../interfaces";

/*
 *  product state type
 */
export type Product = {
  id: string;
  name: string;
  qty: number;
  picture: string;
  expiredAt: string;
  isActive: boolean;
};

/*
 *  store state type
 */
export type ProductState = {
  product: Product;
  isLoading: boolean;
  errors: ErrorInterface | null;
  success: string;
};

export type AllProductState = {
  products: Product[];
  isLoading: boolean;
  errors: ErrorInterface | null;
  totalPages: number;
};

/*
 *  reducer action type
 */
export type Action =
  | FetchProductsAction
  | AddProductAction
  | SetProductAction
  | UnsetProductAction
  | UnsetSuccessAction
  | EditProductAction
  | DeleteProductAction
  | ProductFailAction
  | FetchProductFailAction
  | FetchProductsRequestAction
  | ClearErrorAction
  | ProductRequestAction;

/*
 *  onSubmit parameter's type
 */
export type FormValues = {
  name: string;
  expiredAt: string;
  qty: string;
};

export type NewProduct = {
  name: string;
  qty: number;
  picture: string;
  expiredAt: string;
  isActive: boolean;
};
