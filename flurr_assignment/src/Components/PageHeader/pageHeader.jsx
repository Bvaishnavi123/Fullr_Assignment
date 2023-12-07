import { useEffect, useState } from "react";
import Styles from "./pageHeader.module.css"
export const Header= ()=>{
    const [pageHeaderData, setPageHeaderData] = useState([]);
    useEffect(() => {
        fetch(
          "https://api.furrl.in/api/v1/pageConfiguration/vibe_result_page_header"
        )
          .then((data) => data.json())
          .then((resp) => setPageHeaderData(resp?.widgets))
          .catch((err) => console.log(err));
      }, []);
    return (
        <>
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
        </>
    )
}