import { Link } from "react-router-dom";
import { Order, OrderStatus } from "../../types";
import OrderItemsModal from "./OrderItemsModal";
import { Card, CardContent, Typography } from "@mui/material";

export const OrderStatusLabels = {
  [OrderStatus.Created]: "Создан",
  [OrderStatus.Paid]: "Оплачен",
  [OrderStatus.Transport]: "В пути",
  [OrderStatus.DeliveredToThePoint]: "Доставлен на точку",
  [OrderStatus.Received]: "Получен",
  [OrderStatus.Archived]: "Архивирован",
  [OrderStatus.Refund]: "Возврат",
};

const OrderDetails: React.FC<{ order: Order }> = (props) => {
  const fetchedOrder = props.order;
  const numOfItems = fetchedOrder.items.reduce((prev, cur) => ({
    ...prev,
    count: prev.count + cur.count,
  })).count;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Заказ {fetchedOrder.id}</Typography>
        <Typography>Количество товаров: {numOfItems}</Typography>
        <Typography>Возможность завершения заказа;</Typography>
        <Typography>Стоимость заказа: {fetchedOrder.total}</Typography>
        <Typography>
          Дата создания заказа:{" "}
          {new Date(fetchedOrder.createdAt).toLocaleString()}
        </Typography>
        <Typography>
          Статус: {OrderStatusLabels[fetchedOrder.status]}
        </Typography>
        <Typography>Номер заказа: {fetchedOrder.id}</Typography>
        <OrderItemsModal items={fetchedOrder.items} />
        <Link to={".."} relative="path"></Link>
      </CardContent>
    </Card>
  );
};
export default OrderDetails;
