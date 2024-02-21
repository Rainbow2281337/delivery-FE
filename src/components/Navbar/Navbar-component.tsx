import { useState, SyntheticEvent } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Home, ShoppingCart } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";

const NavbarComponent = () => {
  const [value, setValue] = useState("home");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <nav className="fixed bottom-0 w-full p-4">
      <div className="flex items-center justify-center">
        <div className="min-w-full border-2 rounded-md py-1 md:border-0">
          <BottomNavigation value={value} onChange={handleChange}>
            <BottomNavigationAction
              label="Main"
              value="main"
              icon={<Home fontSize="large" />}
            />
            <BottomNavigationAction
              label="Restaurants"
              value="restaurants"
              icon={<DeliveryDiningOutlinedIcon fontSize="large" />}
            />
            <BottomNavigationAction
              label="Cart"
              value="shopping cart"
              icon={<ShoppingCart fontSize="large" />}
            />
            {isLoggedIn && (
              <BottomNavigationAction
                label="Profile"
                value="profile"
                icon={<AccountCircleOutlinedIcon fontSize="large" />}
              />
            )}
          </BottomNavigation>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
