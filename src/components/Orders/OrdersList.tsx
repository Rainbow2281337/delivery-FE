import { useDispatch, useSelector } from "react-redux";
import Heading from "../Heading";
import OrderItem from "./OrderItem";
import { AppDispatch, RootState } from "../../state/store";
import { translate } from "../../assets/i18n";
import { useEffect, useState } from "react";
import { getOrderHistory } from "../../state/order/orderHistorySlice";
import { OrderHistory } from "../../interfaces/order-interface";
import NoMatches from "../NoMatches";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import OutdoorGrillOutlinedIcon from "@mui/icons-material/OutdoorGrillOutlined";
import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import WhereToVoteOutlinedIcon from "@mui/icons-material/WhereToVoteOutlined";
import CategoryBox from "../CategoryBox";
import Container from "../Container";

const OrdersList = () => {
  const [selectedType, setSelectedType] = useState<string | undefined>("");
  const dispatch = useDispatch<AppDispatch>();
  const orderHistory = useSelector<RootState, OrderHistory[] | []>(
    (state) => state.orderHistory.orderHistory
  );
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );
  const userId = useSelector<RootState, string | null>(
    (state) => state.profileInfo.id
  );

  useEffect(() => {
    const orderHistoryParams = {
      userId: userId,
      status: selectedType,
    };
    try {
      if (userId) {
        dispatch(getOrderHistory(orderHistoryParams));
      }
    } catch (error) {
      console.error(error);
    }
  }, [dispatch, userId, selectedType]);

  const handleTypeSelect = (type: string | undefined) => {
    setSelectedType(type === selectedType ? "" : type);
  };

  const statusFilter = [
    {
      title: translate("processing", preferredLanguage),
      value: "PROCESSING",
      icon: <AccessTimeOutlinedIcon fontSize="large" />,
    },
    {
      title: translate("cooking", preferredLanguage),
      value: "COOKING",
      icon: <OutdoorGrillOutlinedIcon fontSize="large" />,
    },
    {
      title: translate("delivery", preferredLanguage),
      value: "DELIVERY",
      icon: <DeliveryDiningOutlinedIcon fontSize="large" />,
    },
    {
      title: translate("delivered", preferredLanguage),
      value: "DELIVERED",
      icon: <WhereToVoteOutlinedIcon fontSize="large" />,
    },
  ];

  return (
    <Container>
      <div>
        <Heading title={translate("my_orders", preferredLanguage)} />
      </div>
      <div
        className="
          pt-4
          flex
          flex-row
          items-center
          justify-between
          overflow-x-auto
        "
      >
        {statusFilter.map((item) => (
          <div key={item.title} onClick={() => handleTypeSelect(item.value)}>
            <CategoryBox
              category={item.title}
              icon={item.icon}
              selected={selectedType === item.value}
            />
          </div>
        ))}
      </div>
      {orderHistory && orderHistory.length > 0 ? (
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
          {orderHistory.map((order) => (
            <OrderItem key={order.orderId} order={order} />
          ))}
        </div>
      ) : (
        <NoMatches />
      )}
    </Container>
  );
};

export default OrdersList;
