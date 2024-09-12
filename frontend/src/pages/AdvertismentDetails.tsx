import { useLoaderData } from "react-router-dom";
import { Advertisment } from "../types";
import AdvertismentModal from "../components/advertisments/AdvertismentModal";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";

export default function AdvertismentDetails() {
  const fetchedAdvertisment = useLoaderData() as Advertisment;
  const [openedModal, setOpenedModal] = useState(false);

  // TODO
  // Пересмотреть видео и сделать маппинг статусов в текст
  // https://youtu.be/jjMbPt_H3RQ
  return (
    <div>
      <Typography variant="h6">{fetchedAdvertisment.name}</Typography>
      <Typography>Описание: {fetchedAdvertisment.description}</Typography>
      <Typography>Цена: {fetchedAdvertisment.price}</Typography>
      <Typography>
        Дата создания:{" "}
        {new Date(fetchedAdvertisment.createdAt).toLocaleString()}
      </Typography>
      <Typography>просмотры: {fetchedAdvertisment.views}</Typography>
      <Typography>лайки: {fetchedAdvertisment.likes}</Typography>
      <Box>
        {fetchedAdvertisment.imageUrl && (
          <img src={fetchedAdvertisment.imageUrl}></img>
        )}
      </Box>
      <Button
        sx={{ marginTop: 2 }}
        variant="outlined"
        onClick={() => {
          setOpenedModal(true);
        }}
      >
        Редактировать
      </Button>
      <AdvertismentModal
        onClose={() => setOpenedModal(false)}
        open={openedModal}
        advertisment={fetchedAdvertisment}
      />
    </div>
  );
}
