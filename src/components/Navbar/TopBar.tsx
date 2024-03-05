import { useState } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Modal from "../ui/Modal";
import Search from "../ui/Search";
import logo from "../../assets/logo/logo.jpg";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { Restaurant } from "../../interfaces/restaurant-interface";

const TopBar = () => {
  const restaurants = useSelector<RootState, Restaurant[]>(
    (state) => state.getRestaurants.restaurants
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="w-[90%] mx-auto">
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center">
          <div>
            <img src={logo} alt="logo" className="w-24 h-24" />
          </div>
          <div className="hidden md:flex flex-col">
            <span className="text-xl font-bold">The Foodie's</span>
            <span className="text-lg font-semibold">Compass</span>
          </div>
        </div>
        <div className="hidden md:block">
          <Search data={restaurants} />
        </div>
        <div className="flex gap-3">
          <div
            title="Search"
            onClick={handleModal}
            className="md:hidden cursor-pointer"
          >
            <SearchOutlinedIcon fontSize="large" />
          </div>
          <div className="cursor-pointer">
            <div title="Cart" className="absolute">
              <ShoppingCartOutlinedIcon fontSize="large" />
            </div>
            <div className="relative top-[-10px] right-[-25px] bg-yellow-500 rounded-full px-2">
              <span className="text-lg text-white font-medium">0</span>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal data={restaurants} isOpen={isOpen} handleModal={handleModal} />
      )}
    </nav>
  );
};

export default TopBar;
