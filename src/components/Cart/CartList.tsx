import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { CartItem } from "../../interfaces/cart-interface";
import NoMatches from "../NoMatches";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { removeFromCart } from "../../state/order/cartSlice";
import CartTotalInfo from "./CartTotalInfo";
import { translate } from "../../assets/i18n";

const CartList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector<RootState, CartItem[]>(
    (state) => state.cart.items
  );
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );

  const handleRemoveFromCart = (item: CartItem) => {
    dispatch(removeFromCart(item));
  };
  return (
    <div>
      <div>
        {cartItems && cartItems.length > 0 ? (
          <div className="flex flex-col items-center gap-4">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>
                      <div>{translate("title", preferredLanguage)}</div>
                    </TableCell>
                    <TableCell align="center">
                      <div>{translate("quantity", preferredLanguage)}</div>
                    </TableCell>
                    <TableCell align="center">
                      <div>{translate("price", preferredLanguage)}</div>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <div
                          onClick={() => handleRemoveFromCart(item)}
                          className="cursor-pointer hover:text-red-500 transition"
                        >
                          <DeleteOutlineOutlinedIcon fontSize="medium" />
                        </div>
                      </TableCell>
                      <TableCell>{item.title}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="center">₴{item.price}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <CartTotalInfo />
          </div>
        ) : (
          <NoMatches />
        )}
      </div>
    </div>
  );
};

export default CartList;
