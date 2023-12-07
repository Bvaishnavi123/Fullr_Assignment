import { useSelector } from "react-redux"
import Styles from "./productDetails.module.css";

export const ProductDetail = ()=>{
    const productData = useSelector((store)=>store?.ProductReducer?.productsDetailData)
   console.log(productData)
    return(
        <div>
           
            <img src={productData?.images[0].src} className={Styles.singleImg} />
         
        </div>
    )
}