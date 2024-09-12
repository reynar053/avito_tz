import { Box, AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navigation() {
  const navigate = useNavigate();
  function navigateHandler(path: string) {
    navigate(path);
  }
  return (
    <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Личный Кабинет
          </Typography>
          <Button
            color="inherit"
            onClick={() => navigateHandler("/advertisements")}
          >
            Объявления
          </Button>
          <Button color="inherit" onClick={() => navigateHandler("/orders")}>
            Заказы
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
