import Styles from "./productDetails.module.css";
import { Header } from "../../Components/PageHeader/pageHeader.jsx";
import { FaBoxOpen } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { RiHandbagLine } from "react-icons/ri";
import axios from "axios";


import { useEffect, useState } from "react";

export const ProductDetail = () => {
  const [showProductDes, setProductDes] = useState(false);
  const [showDelivery, setShowDelivery] = useState(false);
  const [productsDetailData,setproductsDetailData] = useState({})
  useEffect(()=>{
    const reqBody = {
      id: localStorage.getItem('id')
    };
    axios
      .post("https://api.furrl.in/api/v1/product/getProductDetail", reqBody, {
        method: "POST",
      })
      .then((resp) => {
   
        setproductsDetailData(resp?.data)
       
      })
      .catch((err) => console.log(err));

  },[])

  return (
    <>
      <Header />
      <div className={Styles?.detailsMainContainer}>
        <img
          src={productsDetailData?.data?.image.src}
          className={Styles.singleImg}
        />
        <div className={Styles.detailsContainer}>
          <p className={Styles.brandName}>
            {productsDetailData?.data?.brandName}
          </p>
          <p>{productsDetailData?.data?.title}</p>
          <p>
            Rs{productsDetailData?.data?.price}{" "}
            <span className={Styles.comparePrice}>
              Rs {productsDetailData?.data?.compare_at_price}
            </span>{" "}
            <span className={Styles.discount}>
              {productsDetailData?.data?.furrlDiscountPercent}%{" "}
            </span>
          </p>
          <div className={Styles.productDesBtnContainer}>
            <button
              className={Styles.productDesBtn}
              onClick={() => setProductDes(!showProductDes)}
            >
              <FaBoxOpen fontSize={"20px"} />
              Product Description
            </button>
            {showProductDes ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: productsDetailData?.data?.body_html,
                }}
              />
            ) : null}
          </div>

          <div className={Styles.productDesBtnContainer}>
            <button
              className={Styles.productDesBtn}
              onClick={() => setShowDelivery(!showDelivery)}
            >
              <FaTruck fontSize={"20px"} />
              Delivery
            </button>
            {showDelivery ? (
              <div>
                <p className={Styles.deliveryDes}>
                  Usually ships in 2-3 working days.{" "}
                </p>
                <p className={Styles.deliveryDes}>
                  Enter pincode to check serviceability
                </p>
                <input
                  type="number"
                  className={Styles.pincodeInput}
                  placeholder="Enter Pincode"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className={Styles.addToBagContainer} >
        <h2 className={Styles.lowestPricelabel}>Lock this lowest price now</h2>
        <button className={Styles?.addTobagbtn}><RiHandbagLine/>Add to bag</button>
      </div>
    </>
  );
};
