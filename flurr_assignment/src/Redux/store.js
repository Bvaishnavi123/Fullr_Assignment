import {
  combineReducers,
  legacy_createStore as createStore,
} from "redux";

import { ProductReducer } from "./Reducers/productReducer.js";

const rootReducer = combineReducers({
  ProductReducer: ProductReducer,
});

export const store = createStore(rootReducer);
