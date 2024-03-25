import { Box, Button, Modal } from "@mui/material";
import { Dish } from "../../interfaces/dish-interface";
import React from "react";

interface DishDetailedInfoModalProps {
  dishInfo: Dish;
  isOpen: boolean;
  handleModal: () => void;
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
}) => {
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
              <ul className="flex gap-2">
                {dishInfo.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-400 font-medium">
                    {ingredient},
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <Button variant="contained">Add to cart</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DishDetailedInfoModal;
