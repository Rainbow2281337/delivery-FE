import { useState, SyntheticEvent } from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Home } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";

const NavbarComponent = () => {
  const [value, setValue] = useState("main");

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
              icon={<AccountCircleOutlinedIcon fontSize="large" />}
            />
          </BottomNavigation>
        </div>
      </div>
    </nav>
  );
};

export default NavbarComponent;
