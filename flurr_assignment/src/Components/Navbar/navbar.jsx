import Styles from "./navbar.module.css";
import { FaBars} from "react-icons/fa";
import { BsMinecartLoaded } from "react-icons/bs";
import { BsBox2Heart } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";


export const Navbar = () => {
  return (
    <div className={Styles?.navbarContainer}>
      <FaBars  fontSize={"25px"}/>

      <div className={Styles.title}>Flurr</div>
      <div className={Styles.iconContainer}>
        <CiSearch fontSize={"25px"}/>
        <BsBox2Heart  fontSize={"25px"} />
        <BsMinecartLoaded  fontSize={"25px"}/>
      </div>
    </div>
  );
};
