import { combineReducers } from "redux";
import productReducer from "./productReducer";
import allProductsReducer from "./allProductsReducer";

const reducers = combineReducers({
  product: productReducer,
  allProducts: allProductsReducer,
});

export type StoreState = ReturnType<typeof reducers>;

export default reducers;
