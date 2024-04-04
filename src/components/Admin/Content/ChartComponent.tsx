import { useSelector } from "react-redux";
import { Order } from "../../../interfaces/order-interface";
import { RootState } from "../../../state/store";
import { BarChart } from "@mui/x-charts";
import Heading from "../../Heading";
import { translate } from "../../../assets/i18n";

const ChartComponent = () => {
  const orders = useSelector<RootState, Order[]>(
    (state) => state.orders.orders
  );
  const preferredLanguage = useSelector<RootState, string>(
    (state) => state.setLanguage.currentLanguage
  );

  const groupOrdersByDate = (orders: Order[]): Record<string, number> => {
    const ordersByDate: Record<string, number> = {};
    orders.forEach((order) => {
      const date = new Date(order.orderTimestamp).toLocaleDateString();
      ordersByDate[date] = ordersByDate[date] ? ordersByDate[date] + 1 : 1;
    });
    return ordersByDate;
  };

  const dataByDay = groupOrdersByDate(orders);
  const labels = Object.keys(dataByDay);
  const data = Object.values(dataByDay);

  const chartSettings = {
    height: 300,
  };

  return (
    <div className="py-2 px-4 w-full max-h-[400px] bg-neutral-200 rounded-xl shadow-xl dark:bg-neutral-400">
      <Heading
        title={`${translate("orders_made", preferredLanguage)}`}
        center
      />
      <BarChart
        xAxis={[{ scaleType: "band", data: labels }]}
        series={[{ data: data }]}
        {...chartSettings}
      />
    </div>
  );
};

export default ChartComponent;
