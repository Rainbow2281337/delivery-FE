import { useState, SyntheticEvent } from "react";
import { Home } from "@mui/icons-material";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE, PROFILE_ROUTE } from "../../consts";

interface NavbarComponentProps {
  clickedPageValue: string;
}

const NavbarComponent: React.FC<NavbarComponentProps> = ({
  clickedPageValue,
}) => {
  const [value, setValue] = useState(clickedPageValue);
  const navigate = useNavigate();

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <nav className="fixed bottom-0 w-full p-4">
      <div className="flex items-center justify-center">
        <div className="min-w-full">
          <BottomNavigation value={value} onChange={handleChange}>
            <BottomNavigationAction
              label="Main"
              value="main"
              onClick={() => navigate(HOME_ROUTE)}
              icon={<Home fontSize="large" />}
            />
            <BottomNavigationAction
              label="Food"
              value="food"
              icon={<DeliveryDiningOutlinedIcon fontSize="large" />}
            />
            <BottomNavigationAction
              label="Profile"
              value="profile"
              onClick={() => navigate(PROFILE_ROUTE)}
              icon={<AccountCircleOutlinedIcon fontSize="large" />}
            />
          </BottomNavigation>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
