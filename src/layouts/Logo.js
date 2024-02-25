import { ReactComponent as LogoDark } from "../assets/images/logos/monsterlogo.svg";
import { Link } from "react-router-dom";
import logo from '../assets/images/logos/logo.svg'

const Logo = () => {
  return (
    <Link to="/">
      <img src={logo}/>
    </Link>
  );
};

export default Logo;
