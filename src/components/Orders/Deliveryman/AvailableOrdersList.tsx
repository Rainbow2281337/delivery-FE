import { useSelector } from "react-redux";
import { translate } from "../../../assets/i18n";
import Heading from "../../Heading";
import { RootState } from "../../../state/store";
import { Order } from "../../../interfaces/order-interface";
import AvailableOrderItem from "./AvailableOrderItem";
import NoMatches from "../../NoMatches";
import Container from "../../Container";

const AvailableOrdersList = () => {
  const orders = useSelector<RootState, Order[]>(
    (state) => state.orders.orders
  );
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );
  return (
    <Container>
      <div>
        <Heading title={translate("available_orders", preferredLanguage)} />
      </div>
      <div
        className="
          pt-8
          w-full
          flex
          flex-col
          gap-2
          items-start
          justify-start
        "
      >
        {orders.length > 0 ? (
          orders
            .filter((orderItem) => orderItem.status !== "DELIVERED")
            .map((order) => (
              <AvailableOrderItem key={order.orderId} order={order} />
            ))
        ) : (
          <NoMatches />
        )}
        <div className="mt-4">
          <Heading title={translate("delivered_orders", preferredLanguage)} />
        </div>
        {orders
          .filter((orderItem) => orderItem.status === "DELIVERED")
          .map((order) => (
            <AvailableOrderItem key={order.orderId} order={order} />
          ))}
      </div>
    </Container>
  );
};

export default AvailableOrdersList;
