import Styles from "./productContainer.module.css";
import { useNavigate } from "react-router-dom";
import { IoShare } from "react-icons/io5";

export const ProductContainer = ({ data }) => {
  const navigate = useNavigate();

  const handleProductClick = (ele) => {
    localStorage.setItem("id", ele?.id);
    navigate(`/product-details/${ele?.id}`);
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
            <IoShare className={Styles.shareIcon} />

            <div className={Styles.detailsContainer} >
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
