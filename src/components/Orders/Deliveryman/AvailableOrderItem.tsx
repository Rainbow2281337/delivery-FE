import { Order } from "../../../interfaces/order-interface";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import SubtitlesOffOutlinedIcon from "@mui/icons-material/SubtitlesOffOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import NearMeOutlinedIcon from "@mui/icons-material/NearMeOutlined";
import WhereToVoteOutlinedIcon from "@mui/icons-material/WhereToVoteOutlined";
import { translate } from "../../../assets/i18n";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { useState } from "react";
import { getMoreInfoAboutOrder } from "../../../api/getMoreInfoAboutOrder";
import { changeOrderStatus } from "../../../api/changeOrderStatus";
import { formatTimestamp } from "../../../helpers/formatTimeStamp";

interface AvailableOrderItemProps {
  order: Order;
}

const AvailableOrderItem: React.FC<AvailableOrderItemProps> = ({ order }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [orderMoreData, setOrderMoreData] = useState<Order[]>();
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );

  const handleClick = async (orderId: string) => {
    setIsClicked((value) => !value);

    try {
      const response = await getMoreInfoAboutOrder(orderId);

      setOrderMoreData(response);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalPrice = (data: Order[] | undefined) => {
    if (data && data.length > 0) {
      const totalPrice = data
        .map((item) => item.dishPrice)
        .reduce((acc, dishPrice) => acc + dishPrice, 0);
      return totalPrice;
    }
    return 0;
  };

  const handleClickChangeStatus = async (orderId: string, status: string) => {
    switch (status) {
      case "PROCESSING":
        status = "COOKING";
        break;
      case "COOKING":
        status = "DELIVERY";
        break;
      case "DELIVERY":
        status = "DELIVERED";
        break;
      default:
        console.error("Unexpected order status:", status);
        return;
    }

    try {
      await changeOrderStatus(orderId, status);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="w-full">
      <div>
        <div className="flex flex-col items-start justify-start gap-2 border-b dark:border-neutral-500">
          <div className="flex items-center gap-3 dark:text-white">
            <AccountCircleOutlinedIcon fontSize="large" />
            <div>
              <div className="flex items-center gap-1">
                <p className="text-lg font-medium">
                  {order.userFirstName} {order.userLastName}
                </p>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  ({formatTimestamp(order.orderTimestamp)})
                </p>
              </div>
              <div
                className={`flex items-center gap-1 py-1 px-2 rounded-xl ${
                  order.status === "PROCESSING" ||
                  order.status === "COOKING" ||
                  order.status === "DELIVERING"
                    ? "bg-yellow-500/70"
                    : "bg-yellow-600/90"
                }`}
              >
                {order.status === "PROCESSING" || order.status === "COOKING" ? (
                  <ScheduleOutlinedIcon fontSize="small" />
                ) : order.status === "DELIVERING" ? (
                  <NearMeOutlinedIcon />
                ) : (
                  <WhereToVoteOutlinedIcon />
                )}
                <p className="text-sm font-semibold">{order.status}</p>
              </div>
              {order.status !== "DELIVERED" && (
                <div className="flex gap-1 mt-2">
                  <p className="text-sm">
                    {translate("waiting", preferredLanguage)}
                  </p>
                  <p className="text-sm">{order.averageWaitingTimeMinutes} </p>
                  <span className="text-sm">
                    {translate("min", preferredLanguage)}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div
            title={`${translate("see_more_info", preferredLanguage)}`}
            className="p-2 self-end cursor-pointer dark:text-white"
          >
            {isClicked ? (
              <div onClick={() => setIsClicked((value) => !value)}>
                <SubtitlesOffOutlinedIcon fontSize="large" />
              </div>
            ) : (
              <div onClick={() => handleClick(order.orderId)}>
                <InfoOutlinedIcon fontSize="large" />
              </div>
            )}
          </div>
          {isClicked &&
            orderMoreData &&
            orderMoreData.length > 0 &&
            orderMoreData.map((moreData) => (
              <div key={moreData.dishId}>
                <div className="flex flex-col gap-1">
                  <div>
                    <p className="text-neutral-500 font-medium dark:text-neutral-400">
                      {moreData.dishTitle}
                    </p>
                  </div>
                  <div className="flex flex-row gap-1 dark:text-white">
                    <PaymentsOutlinedIcon />
                    <span className="text-neutral-500 dark:text-neutral-400">
                      ₴{moreData.dishPrice}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          <div className="mb-2 flex items-center gap-2">
            <div
              title={`${translate("total", preferredLanguage)}`}
              className="dark:text-white"
            >
              <PaymentsOutlinedIcon fontSize="large" />
            </div>
            <span className="text-lg text-neutral-500 dark:text-neutral-400">
              ₴{calculateTotalPrice(orderMoreData)}
            </span>
          </div>
          {order.status !== "DELIVERED" && (
            <div className="mb-2 border dark:border-neutral-600 py-1 px-4 rounded-xl hover:opacity-70 transition">
              <button
                onClick={() =>
                  handleClickChangeStatus(order.orderId, order.status)
                }
                className="dark:text-white"
              >
                {translate("change_status", preferredLanguage)}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableOrderItem;
