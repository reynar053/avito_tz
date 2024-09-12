import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Advertisment } from "../../types";

type AdvertismentData = {
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
};

const sendRequest = (
  ad: AdvertismentData,
  mode: string,
  id: string | undefined
) => {
  const result = fetch(`http://localhost:3000/advertisements/${id || ""}`, {
    method: mode,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ ...ad, createdAt: new Date() }),
  });
  return result;
};

const AdvertismentModal: React.FC<{
  advertisment?: Advertisment;
  open: boolean;
  onClose: () => void;
}> = ({ advertisment, open, onClose }) => {
  const mode: string = advertisment ? "PATCH" : "POST";
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState("");
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());

            const advertismentData = {
              name: formJson.name,
              description: formJson.description,
              price: formJson.price,
              imageUrl: formJson.imageUrl,
            };
            console.log(advertismentData);
            sendRequest(advertismentData, mode, advertisment?.id).then(
              (response) => {
                if (response.ok) {
                  setIsSubmitSuccessful("Success");
                  onClose();
                } else {
                  setIsSubmitSuccessful("Error");
                }
              }
            );
          },
        }}
      >
        <DialogTitle>
          {advertisment ? "Редактировать объявление" : "Новое объявление"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Название"
            type="text"
            defaultValue={advertisment?.name}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Описание"
            type="text"
            defaultValue={advertisment?.description}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="price"
            name="price"
            label="Цена"
            type="text"
            defaultValue={advertisment?.price}
            fullWidth
            variant="standard"
            placeholder=" ₽"
          />
          <TextField
            autoFocus
            margin="dense"
            id="imageUrl"
            name="imageUrl"
            label="Картинка"
            type="text"
            defaultValue={advertisment?.imageUrl}
            fullWidth
            variant="standard"
            placeholder="https://"
          />
        </DialogContent>
        <Typography>{isSubmitSuccessful}</Typography>
        <DialogActions>
          <Button onClick={onClose}>Отмена</Button>
          <Button type="submit">Сохранить</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdvertismentModal;
