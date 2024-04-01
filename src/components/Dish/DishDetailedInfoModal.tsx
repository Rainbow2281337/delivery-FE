import { Box, Modal } from "@mui/material";
import { Dish } from "../../interfaces/dish-interface";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { translate } from "../../assets/i18n";

interface DishDetailedInfoModalProps {
  dishInfo: Dish;
  isOpen: boolean;
  handleModal: () => void;
  handleAddToCart: () => void;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
};

const DishDetailedInfoModal: React.FC<DishDetailedInfoModalProps> = ({
  dishInfo,
  isOpen,
  handleModal,
  handleAddToCart,
}) => {
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );
  return (
    <div className="absolute">
      <Modal open={isOpen} onClose={handleModal}>
        <Box sx={style}>
          <div>
            <div>
              <img
                src="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="dish"
                className="h-72 object-cover rounded-xl"
              />
            </div>
            <div className="mt-1 uppercase">
              <span className="text-xl md:text-2xl font-semibold">
                {dishInfo.title}
              </span>
            </div>
            <div className="my-2">
              <span className="text-xl font-semibold">{dishInfo.price} ₴</span>
            </div>
            <div className="mb-6">
              <ul className="flex items-start justify-start gap-1">
                {dishInfo.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-400 font-medium">
                    {ingredient},
                  </li>
                ))}
                <li className="text-gray-400 font-medium">
                  {dishInfo.weight} {translate("gram", preferredLanguage)}
                  {" / "}
                </li>
                <li className="text-gray-400 font-medium">
                  {dishInfo.calories} {translate("kcal", preferredLanguage)}
                </li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={handleAddToCart}
                className="w-full py-2 border rounded-lg bg-green-500 hover:bg-green-600 transition text-white font-medium"
              >
                {translate("add_to_cart", preferredLanguage)}
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DishDetailedInfoModal;
