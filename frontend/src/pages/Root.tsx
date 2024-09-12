import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import { Container } from "@mui/material";

export default function Root() {
  return (
    <>
      <Navigation />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}
