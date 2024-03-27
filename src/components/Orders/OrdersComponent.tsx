import Container from "../Container";
import OrdersList from "./OrdersList";

const OrdersComponent = () => {
  return (
    <Container>
      <div className="pt-40">
        <OrdersList />
      </div>
    </Container>
  );
};

export default OrdersComponent;
