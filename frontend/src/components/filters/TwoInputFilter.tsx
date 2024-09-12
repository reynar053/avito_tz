import { useState } from "react";
import { Stack, Typography, TextField, Box } from "@mui/material";

interface ITwoInputFilter {
  title: string;
  min: number;
  max: number;
  handleFilter: (min: number, max: number) => void;
}

const TwoInputFilter: React.FC<ITwoInputFilter> = ({
  title,
  min,
  max,
  handleFilter,
}) => {
  const [minValue, setMinValue] = useState<number>(min);
  const [maxValue, setMaxValue] = useState<number>(max);

  const handleMinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setMinValue(value);
    handleFilter(value, maxValue);
  };

  const handleMaxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setMaxValue(value);
    handleFilter(minValue, value);
  };

  return (
    <Box sx={{ width: 200 }}>
      <Typography>{title}</Typography>
      <Stack direction="row" justifyContent="space-evenly" alignItems="center">
        <TextField
          label="от"
          type="number"
          variant="outlined"
          sx={{ width: "90px" }}
          size="small"
          value={minValue}
          onChange={handleMinChange}
        />
        <Typography>-</Typography>
        <TextField
          label="до"
          type="number"
          variant="outlined"
          size="small"
          sx={{ width: "90px" }}
          value={maxValue}
          onChange={handleMaxChange}
        />
      </Stack>
    </Box>
  );
};

export default TwoInputFilter;
