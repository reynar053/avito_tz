import { useLoaderData } from "react-router-dom";
import { Advertisment } from "../types";
import {
  Box,
  Button,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import AdvertismentCard from "../components/advertisments/AdvertismentCard";
import { useEffect, useMemo, useState } from "react";
import AdvertismentModal from "../components/advertisments/AdvertismentModal";
import { newPage, PagingResponse } from "../fetching";

export default function AdvertismentList() {
  const [adsData, setAdsData] = useState<PagingResponse<Advertisment>>(
    useLoaderData() as PagingResponse<Advertisment>
  );
  const [openedModal, setOpenedModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const adsToShow = useMemo(() => {
    if (!searchValue) {
      return adsData.data;
    } else {
      return [...adsData.data].filter((ad) =>
        ad.name.toLowerCase().startsWith(searchValue.toLowerCase())
      );
    }
  }, [adsData, searchValue]);
  // const search = (value: string) => {
  //   let temp = [...adsToShow].filter((ad) => ad.name.startsWith(value));
  // };

  useEffect(() => {
    newPage(adsData.current, "advertisements", setAdsData, rowsPerPage);
  }, [rowsPerPage]);

  return (
    <>
      <Typography variant="h4" textAlign="center" gutterBottom>
        Объявления
      </Typography>
      <Box display="flex" gap={4} sx={{ marginBottom: 2 }}>
        <Button
          variant="outlined"
          onClick={() => {
            setOpenedModal(true);
          }}
        >
          Создать объявление
        </Button>
        <AdvertismentModal
          onClose={() => setOpenedModal(false)}
          open={openedModal}
        />
        <TextField
          label="Поиск"
          onChange={(event) => setSearchValue(event.target.value)}
          size="small"
        ></TextField>
      </Box>
      <Grid container spacing={{ xs: 1, md: 2 }}>
        {adsToShow.map((post) => (
          <Grid key={post.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <AdvertismentCard key={post.id} advertisment={post} />
          </Grid>
        ))}
      </Grid>
      <Select
        id="rows-select"
        value={String(rowsPerPage)}
        label="Rows"
        onChange={(event: SelectChangeEvent) => {
          const newRowsPerPage = Number(event.target.value);
          setRowsPerPage(Number(newRowsPerPage));
        }}
      >
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={25}>25</MenuItem>
      </Select>
      <Pagination
        count={adsData.pages}
        onChange={(_, page) => {
          newPage(page, "advertisements", setAdsData, rowsPerPage);
        }}
        page={adsData.current}
      />
    </>
  );
}
