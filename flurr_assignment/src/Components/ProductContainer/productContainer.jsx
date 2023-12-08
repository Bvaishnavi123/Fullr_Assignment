import { useDispatch, useSelector } from "react-redux";
import Styles from "./productContainer.module.css";
import { productDetails } from "../../Redux/Actions/productAction.js";
import { IoShare } from "react-icons/io5";

import axios from "axios";
import { useNavigate } from "react-router-dom";
export const ProductContainer = ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  
  const handleProductClick = (ele) => {
    const reqBody = {
      id: ele?.id,
    };
    axios
      .post("https://api.furrl.in/api/v1/product/getProductDetail", reqBody, {
        method: "POST",
      })
      .then((resp) => {
        dispatch(productDetails(resp?.data))
        navigate("/product-details")
      })
      .catch((err) => console.log(err));

      
  };
  return (
    <div className={Styles.ProductContainer}>
      {data?.map((ele, index) => {
        return (
          <div
            key={index}
            className={Styles.singleImgContainer}
            onClick={() => handleProductClick(ele)}
          >
            <img src={ele?.images[0].src} className={Styles.singleImg} />
          
            <div className={Styles.detailsContainer}>
              <p className={Styles.brandName}>{ele?.brandName}</p>
              <p>{ele?.title}</p>
              <p>
                Rs{ele?.price}{" "}
                <span className={Styles.comparePrice}>
                  Rs {ele?.compare_at_price}
                </span>{" "}
                <span className={Styles.discount}>
                  {ele?.furrlDiscountPercent}%{" "}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
