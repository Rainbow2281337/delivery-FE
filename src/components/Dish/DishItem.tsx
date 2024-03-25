import { IconButton } from "@mui/material";
import { Dish } from "../../interfaces/dish-interface";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";
import DishDetailedInfoModal from "./DishDetailedInfoModal";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { translate } from "../../assets/i18n";

interface DishItemProps {
  dish: Dish;
}

const DishItem: React.FC<DishItemProps> = ({ dish }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="relative">
      <div onClick={handleModal} className="cursor-pointer">
        <div>
          <img
            src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="dish"
            className="h-96 w-[24rem] object-cover rounded-xl border border-white dark:border-black"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 px-4 py-2 bg-white border rounded-xl dark:bg-neutral-800 dark:border-black">
          <div>
            <span className="text-xl md:text-2xl font-semibold dark:text-white">
              {dish.title}
            </span>
          </div>
          <div className="border inline-flex px-3 mt-1 mb-3 rounded-lg dark:border-neutral-500">
            <span className="text-sm md:text-base dark:text-white">
              {dish.category}
            </span>
          </div>
          <div className="mb-5">
            <span className="text-lg text-neutral-500 font-medium dark:text-neutral-400">
              {dish.description}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start">
              <span className="text-lg font-medium dark:text-white">
                {translate("price", preferredLanguage)}
              </span>
              <span className="text-xl font-semibold dark:text-neutral-400">
                {dish.price} ₴
              </span>
            </div>
            <div title="Add to cart">
              <IconButton color="primary">
                <AddShoppingCartIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <DishDetailedInfoModal
          dishInfo={dish}
          isOpen={isModalOpen}
          handleModal={handleModal}
        />
      )}
    </div>
  );
};

export default DishItem;
