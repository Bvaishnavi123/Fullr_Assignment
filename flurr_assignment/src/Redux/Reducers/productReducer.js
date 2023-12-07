import { productAction } from "../Actions/ActionTypes.js";
const intialState = {
  productsDetailData: {},
};

export const ProductReducer = (state = intialState, action) => {
  switch (action.type) {
    case productAction.GET_PRODUCT_DETAILS: {
      return {
        ...state,
        productsDetailData:action?.payload
      };
    }

    default:
      return state;
  }
};
