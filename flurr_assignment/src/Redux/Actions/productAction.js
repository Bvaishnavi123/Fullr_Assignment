import {productAction} from "./ActionTypes.js"

export const productDetails = (payload)=>({
    type: productAction?.GET_PRODUCT_DETAILS,
    payload
})