import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { OrderStatus } from "../../types";
import { OrderStatusLabels } from "../orders/OrderDetails";

interface IOrdersFilter {
  filterHandler: (status: number, checked: boolean) => void;
}

const OrdersFilter: React.FC<IOrdersFilter> = ({ filterHandler }) => {
  return (
    <div>
      <FormGroup row={true}>
        {Object.keys(OrderStatus).map((key) => {
          const statusValue = OrderStatus[key as keyof typeof OrderStatus];
          const label = OrderStatusLabels[statusValue];
          return (
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label={label}
              key={key}
              onChange={(_, checked) => {
                filterHandler(statusValue, checked);
              }}
            />
          );
        })}
      </FormGroup>
    </div>
  );
};

export default OrdersFilter;
