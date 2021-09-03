import axios, { AxiosError } from "axios";
import { Dispatch } from "react";
import { BASE_URL, PRODUCTS_PER_PAGE } from "../../constant";
import { Action, NewProduct, Product } from "../../ts/types";
import { ActionType } from "../../ts/enums";

/*
 *  get all products
 *  client side products searching, not a good approach
 *  since there is not uri endpoint to implement serverside searching
 */
export const fetchProducts = (query: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      // set state to loading
      dispatch({ type: ActionType.FETCH_PRODUCTS_REQUEST });
      dispatch({ type: ActionType.CLEAR_ERRORS });

      const { data } = await axios.get(BASE_URL + "/product");
      const products: Product[] = data;

      // filtering products from local state (store)
      const filteredProducts = products.filter((product) =>
        product.name.includes(query)
      );

      const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

      // fire dispatch to update the all products state
      dispatch({
        type: ActionType.FETCH_PRODUCTS_SUCCESS,
        payload: { products: filteredProducts, totalPages },
      });
    } catch (error) {
      // error handling
      const payload = getError(error as AxiosError);

      dispatch({
        type: ActionType.FETCH_PRODUCTS_FAIL,
        payload,
      });
    }
  };
};

/*
 *  get specific product by :id
 */
export const setProduct = (id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      // set state to loading
      dispatch({ type: ActionType.UNSET_PRODUCT });

      // destructuring response
      // destructured "data" is Product
      const { data } = await axios.get(BASE_URL + "/product/" + id);
      const product: Product = data;

      const fixedDate = product.expiredAt.split("T")[0];

      // fire dispatch to save result
      dispatch({
        type: ActionType.SET_PRODUCT_SUCCESS,
        payload: {
          ...product,
          expiredAt: fixedDate,
        },
      });
    } catch (error) {
      // error handling
      const payload = getError(error as AxiosError);

      dispatch({
        type: ActionType.SET_PRODUCT_FAIL,
        payload,
      });
    }
  };
};

/*
 *  add new product
 */
export const createProduct = (product: NewProduct) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      // set state to loading
      dispatch({ type: ActionType.SET_PRODUCT_REQUEST });

      await axios.post(BASE_URL + "/product", product);

      // fire dispatch to save result
      dispatch({
        type: ActionType.ADD_PRODUCT_SUCCESS,
        payload: { success: "added" },
      });
    } catch (error) {
      // error handling
      const payload = getError(error as AxiosError);

      dispatch({
        type: ActionType.SET_PRODUCT_FAIL,
        payload,
      });
    }
  };
};

/*
 *  modify product and return the modified product from api
 *  set the modified product to local state (store)
 */
export const editProduct = (product: Product) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      // set state to loading
      dispatch({ type: ActionType.UNSET_PRODUCT });

      const { data } = await axios.put(
        BASE_URL + "/product/" + product.id,
        product
      );

      // fire dispatch to save result
      dispatch({
        type: ActionType.EDIT_PRODUCT,
        payload: {
          product: data,
          success: "updated",
        },
      });
    } catch (error) {
      // error handling
      const payload = getError(error as AxiosError);

      dispatch({
        type: ActionType.SET_PRODUCT_FAIL,
        payload,
      });
    }
  };
};

/*
 *  modify product and return the modified product from api
 *  set the modified product to local state (store)
 */
export const deleteProduct = (id: string) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      // set state to loading
      dispatch({ type: ActionType.UNSET_PRODUCT });

      await axios.delete(BASE_URL + "/product/" + id);

      // fire dispatch to save result
      dispatch({
        type: ActionType.DELETE_PRODUCT,
        payload: {
          success: "deleted",
        },
      });
    } catch (error) {
      // error handling
      const payload = getError(error as AxiosError);

      dispatch({
        type: ActionType.SET_PRODUCT_FAIL,
        payload,
      });
    }
  };
};

/*
 *  set success product state to false after product added/updated success
 */
export const unsetSuccess = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.UNSET_SUCCESS,
    });
  };
};

/*
 *  get error message from failed request
 *  return an object
 */
const getError = (error: AxiosError) => {
  if (axios.isAxiosError(error)) {
    const serverError = error;

    // if the request made were invalid
    if (serverError && serverError.response) {
      // error response is showing string, "Not Found"
      // instead of an object { message: "Not Found" }
      const msg: string = serverError.response.data;

      return {
        message: msg,
      };
    }
  }
  return {
    message: "There was an error processing your request",
  };
};
