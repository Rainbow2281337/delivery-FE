import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo/logo.png";
import { HOME_ROUTE } from "../../consts";
const Logo = () => {
  const navigate = useNavigate();
  return (
    <>
      <img
        onClick={() => navigate(HOME_ROUTE)}
        src={logo}
        alt="Logo"
        height={100}
        width={100}
        className="hidden md:block cursor-pointer"
      />
    </>
  );
};

export default Logo;
