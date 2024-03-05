import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Search from "./Search";
import { Restaurant } from "../../interfaces/restaurant-interface";

interface ModalProps {
  data: Restaurant[];
  isOpen: boolean;
  handleModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ data, isOpen, handleModal }) => {
  return (
    <div>
      <Dialog open={isOpen} onClose={handleModal}>
        <DialogTitle sx={{ fontSize: "23px", fontWeight: 700 }}>
          Find Your Perfect Bite!
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: "20px", fontSize: "18px" }}>
            Enter food name
          </DialogContentText>
          <Search data={data} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModal}>Cancel</Button>
          <Button type="submit">Search</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Modal;
