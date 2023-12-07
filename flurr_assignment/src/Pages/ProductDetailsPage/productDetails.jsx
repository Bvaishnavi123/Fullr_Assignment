import { useSelector } from "react-redux";
import Styles from "./productDetails.module.css";
import { Header } from "../../Components/PageHeader/pageHeader.jsx";

export const ProductDetail = () => {
  const productsDetailData = useSelector(
    (store) => store?.ProductReducer?.productsDetailData
  );
console.log(productsDetailData)
  
  return (
  
  <>
  <Header/>
  <div>
       <img src={productsDetailData?.data?.image.src} className={Styles.singleImg} />
       <div className={Styles.detailsContainer}>
              <p className={Styles.brandName}>{productsDetailData?.data?.brandName}</p>
              <p>{productsDetailData?.data?.title}</p>
              <p>
                Rs{productsDetailData?.data?.finalRetailPrice}{" "}
                
                <span className={Styles.discount}>
                  {productsDetailData?.data?.furrlDiscountPercent}%{" "}
                </span>
              </p>
            </div>
  </div>
  
  </>)
};
