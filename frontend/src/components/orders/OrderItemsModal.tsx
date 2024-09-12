import {
  Button,
  List,
  ListItemText,
  ListItemButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import { useState } from "react";
import { OrderItem } from "../../types";
import { useNavigate } from "react-router-dom";

const OrderItemsModal: React.FC<{ items: OrderItem[] }> = ({ items }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Показать товары</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
        }}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Товары в заказе</DialogTitle>
        <DialogContent>
          <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {items.map((item) => (
              <ListItemButton
                onClick={() => navigate(`/advertisements/${item.id}`)}
                key={item.id}
              >
                <ListItemAvatar>
                  {item.imageUrl && (
                    <Avatar
                      alt={item.name}
                      src={item.imageUrl}
                      variant="square"
                    />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={item.name}
                  secondary={`${item.price}₽ x ${item.count}`}
                />
              </ListItemButton>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderItemsModal;
