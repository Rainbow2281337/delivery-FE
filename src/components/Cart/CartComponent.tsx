import { useSelector } from "react-redux";
import { translate } from "../../assets/i18n";
import Container from "../Container";
import Heading from "../Heading";
import CartList from "./CartList";
import { RootState } from "../../state/store";

const CartComponent = () => {
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );
  return (
    <>
      <Container>
        <div className="pt-40">
          <Heading title={`${translate("shopping_cart", preferredLanguage)}`} />
          <CartList />
        </div>
      </Container>
    </>
  );
};

export default CartComponent;
