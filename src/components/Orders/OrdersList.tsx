import { useSelector } from "react-redux";
import Heading from "../Heading";
import OrderItem from "./OrderItem";
import { RootState } from "../../state/store";
import { translate } from "../../assets/i18n";

const OrdersList = () => {
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );

  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const orders = [
    {
      orderId: 1,
      orderData: ["Salad", "Burger"],
      orderStatus: "Processing",
      averageWaitingTime: getRandomNumber(15, 60),
      date: "27.03.2024",
      totalPrice: 345,
    },
    {
      orderId: 2,
      orderData: ["Salad", "Burger"],
      orderStatus: "Cooking",
      averageWaitingTime: getRandomNumber(15, 60),
      date: "27.03.2024",
      totalPrice: 120,
    },
    {
      orderId: 3,
      orderData: ["Salad", "Burger"],
      orderStatus: "Delivered",
      averageWaitingTime: getRandomNumber(15, 60),
      date: "25.03.2024",
      totalPrice: 235,
    },
    {
      orderId: 4,
      orderData: ["Salad", "Burger"],
      orderStatus: "Delivered",
      averageWaitingTime: getRandomNumber(15, 60),
      date: "20.03.2024",
      totalPrice: 145,
    },
  ];
  return (
    <div>
      <div>
        <Heading title={translate("my_orders", preferredLanguage)} />
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
        {orders.map((order) => (
          <OrderItem
            key={order.orderId}
            orderId={order.orderId}
            orderData={order.orderData}
            orderStatus={order.orderStatus}
            averageWaitingTime={order.averageWaitingTime}
            date={order.date}
            totalPrice={order.totalPrice}
          />
        ))}
      </div>
    </div>
  );
};

export default OrdersList;
