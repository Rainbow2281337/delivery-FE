import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { translate } from "../../assets/i18n";
import { useNavigate } from "react-router-dom";
import { RESTAURANTS_ROUTE } from "../../consts";

interface OrderItemProps {
  orderId: number;
  orderData: string[];
  orderStatus: string;
  averageWaitingTime: number;
  date: string;
  totalPrice: number;
}

const OrderItem: React.FC<OrderItemProps> = ({
  orderId,
  orderData,
  orderStatus,
  averageWaitingTime,
  date,
  totalPrice,
}) => {
  const navigate = useNavigate();
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );
  return (
    <div className="w-full">
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
          <div className="flex flex-col items-start">
            <div className="text-lg font-bold">№ {orderId}</div>
            <div className="text-sm text-neutral-500">{date}</div>
            <div
              className={`font-semibold md:text-lg ${
                orderStatus === "Delivered"
                  ? "text-green-500"
                  : "text-yellow-500"
              }`}
            >
              {orderStatus}
            </div>
            {orderStatus !== "Delivered" && (
              <div className="text-sm text-neutral-500">
                {translate("average_waiting_time", preferredLanguage)}
                {": "}
                {averageWaitingTime} {translate("minutes", preferredLanguage)}
              </div>
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <ul className="flex flex-col gap-3">
              {orderData.map((data, index) => (
                <li key={index} className="w-40 border-b pb-1">
                  <span className="text-lg md:text-xl font-medium">{data}</span>
                </li>
              ))}
              <li className="text-lg font-bold">
                {orderStatus === "Delivered"
                  ? `${translate("paid", preferredLanguage)}: ${totalPrice}₴`
                  : `${translate(
                      "total_price",
                      preferredLanguage
                    )}: ${totalPrice}₴`}
              </li>
            </ul>
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              {orderStatus !== "Delivered" && (
                <div>
                  <button className="py-2 px-3 text-white font-medium border rounded-lg bg-green-500 hover:bg-green-600 transition">
                    {translate("pay", preferredLanguage)}
                  </button>
                </div>
              )}
              {orderStatus !== "Delivered" && (
                <div>
                  <button className="py-2 px-3 text-white font-medium border rounded-lg bg-red-500 hover:bg-red-600 transition">
                    {translate("cancel_order", preferredLanguage)}
                  </button>
                </div>
              )}
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
