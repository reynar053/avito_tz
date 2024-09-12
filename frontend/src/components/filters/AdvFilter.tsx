import { Paper, Button, Box } from "@mui/material";
import TwoInputFilter from "./TwoInputFilter";

const AdvFilter: React.FC = () => {
  return (
    <>
      <Box sx={{ width: 220 }}>
        <Paper>
          <TwoInputFilter title="Цена" />
          <TwoInputFilter title="Просмотры" />
          <TwoInputFilter title="Лайки" />
          <Button onClick={() => {}}>Применить</Button>
        </Paper>
      </Box>
    </>
  );
};

export default AdvFilter;
