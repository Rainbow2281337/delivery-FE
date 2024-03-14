import { IconButton } from "@mui/material";
import { Dish } from "../../interfaces/dish-interface";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useState } from "react";
import DishDetailedInfoModal from "./DishDetailedInfoModal";

interface DishItemProps {
  dish: Dish;
}

const DishItem: React.FC<DishItemProps> = ({ dish }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="relative">
      <div onClick={handleModal} className="cursor-pointer">
        <div>
          <img
            src="https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="dish"
            className="h-96 w-[24rem] object-cover rounded-xl border border-white"
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 px-4 py-2 bg-white border rounded-xl">
          <div>
            <span className="text-xl md:text-2xl font-semibold">
              {dish.title}
            </span>
          </div>
          <div className="border-2 inline-flex px-3 mt-1 mb-3 rounded-lg">
            <span className="text-sm md:text-base uppercase">
              {dish.category}
            </span>
          </div>
          <div className="mb-5">
            <span className="text-lg text-gray-400 font-medium">
              {dish.description}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-start">
              <span className="text-lg font-medium">Price</span>
              <span className="text-xl font-semibold">{dish.price} ₴</span>
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
