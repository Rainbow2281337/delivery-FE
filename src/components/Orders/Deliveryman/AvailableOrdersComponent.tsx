import Container from "../../Container";
import AvailableOrdersList from "./AvailableOrdersList";

const AvailableOrdersComponent = () => {
  return (
    <Container>
      <div className="pt-40">
        <AvailableOrdersList />
      </div>
    </Container>
  );
};

export default AvailableOrdersComponent;
