import { useEffect, useRef, useState } from "react";
import Styles from "./home.module.css";
import { CiFilter } from "react-icons/ci";
import { debounce } from "lodash";
import { ProductContainer } from "../../Components/ProductContainer/productContainer.jsx";

export const Home = () => {
  const [pageHeaderData, setPageHeaderData] = useState([]);
  const [vibeImgUrl, setVibeImgUrl] = useState("");
  const [totalStoredProductIdsCount, setTotalStoredProductIdsCount] =
    useState(0);
  const [category, setCategory] = useState([]);
  const [productData, setProductData] = useState([]);

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(2);

  const fetchData = (pageToFetch) => {
    const requestData = { vibe: "#NightFlea" };

    return fetch(
      `https://api.furrl.in/api/v1/vibe/getVibeRelate?visitId=&page=${pageToFetch}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => console.error("Error:", error));
  };
  useEffect(() => {
    fetch(
      "https://api.furrl.in/api/v1/pageConfiguration/vibe_result_page_header"
    )
      .then((data) => data.json())
      .then((resp) => setPageHeaderData(resp?.widgets))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetchData(page).then(
      ({
        vibeImageUrl,
        totalStoredProductIdsCount,
        furrlProductCategoryList,
        productData,
      }) => {
        setVibeImgUrl(vibeImageUrl);
        setTotalStoredProductIdsCount(totalStoredProductIdsCount);
        setCategory(furrlProductCategoryList);
        setProductData(productData);
      }
    );
  }, [page]);
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMoreData();
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage]);

  const loadMoreData = () => {
    const requestData = {
      vibe: "#NightFlea",
    };

    fetch(
      `https://api.furrl.in/api/v1/vibe/getVibeRelate?visitId=&page=${currentPage}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProductData((prevData) => [...prevData, ...data.productData]);
        setCurrentPage(currentPage + 1);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className={Styles.homeContainer}>
      <div>
        {pageHeaderData?.map((ele, index) => {
          return (
            <img
              src={ele?.background_image?.url}
              className={Styles.imgContainer}
            />
          );
        })}
      </div>
      <div className={Styles.vibeImgContainer}>
        <img src={vibeImgUrl} className={Styles.vibeImg} />
      </div>
      <div className={Styles.productLabelContainer}>
        <p className={Styles.productLabel}>Products</p>
      </div>

      <div className={Styles.totalProductsCount}>
        <p style={{ color: "grey" }}>{totalStoredProductIdsCount} Products</p>
        <CiFilter fontSize={"25px"} />
      </div>

      <div className={Styles.categoryContainer}>
        <div className={Styles.categoryLabel}>All</div>
        {category?.map((ele, index) => {
          return (
            <div key={index} className={Styles.categoryLabel}>
              {ele.furrlProductCategoryName}
            </div>
          );
        })}
      </div>
      <ProductContainer data={productData} />
    </div>
  );
};
