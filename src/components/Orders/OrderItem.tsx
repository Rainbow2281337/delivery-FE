import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { translate } from "../../assets/i18n";
import { useNavigate } from "react-router-dom";
import { RESTAURANTS_ROUTE } from "../../consts";
import { OrderHistory } from "../../interfaces/order-interface";
import { formatTimestamp } from "../../helpers/formatTimeStamp";

interface OrderItemProps {
  order: OrderHistory;
}

const OrderItem: React.FC<OrderItemProps> = ({ order }) => {
  const navigate = useNavigate();
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );

  return (
    <div className="w-full">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
          <div className="flex flex-col items-start justify-start">
            {order.entries.map((order, index) => (
              <div key={index} className="flex flex-col items-start gap-1">
                <div className="mt-2 font-semibold text-md text-neutral-500">
                  {formatTimestamp(order.orderTimestamp)}
                </div>
                <div
                  className={`font-semibold md:text-lg ${
                    order.status === "Delivered"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {order.status}
                </div>
                {order.status !== "DELIVERED" && (
                  <div className="text-sm text-neutral-500">
                    {translate("average_waiting_time", preferredLanguage)}
                    {": "}
                    {order.averageWaitingTimeMinutes}{" "}
                    {translate("minutes", preferredLanguage)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <ul className="flex flex-col gap-3">
              {order.entries.map((order, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <li className="w-40 border-b pb-1">
                    <span className="text-lg md:text-xl font-medium">
                      {order.dishTitle}{" "}
                    </span>
                    <span>
                      ({order.dishCalories}{" "}
                      {translate("kcal", preferredLanguage)})
                    </span>
                  </li>
                  <li className="text-lg font-bold">
                    {order.status === "DELIVERED"
                      ? `${translate("paid", preferredLanguage)}: ${
                          order.dishPrice
                        }₴`
                      : `${translate("price", preferredLanguage)}: ${
                          order.dishPrice
                        }₴`}
                  </li>
                </div>
              ))}
            </ul>
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <div>
                <button
                  onClick={() => navigate(RESTAURANTS_ROUTE)}
                  className="py-2 px-3 text-white font-medium border rounded-lg bg-blue-700 hover:bg-blue-800 transition"
                >
                  {translate("place_feedback", preferredLanguage)}
                </button>
              </div>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default OrderItem;
