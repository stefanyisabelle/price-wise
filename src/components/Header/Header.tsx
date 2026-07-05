import { AppBar, Button, Toolbar, Typography } from "@mui/material";

import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          PriceWise
        </Typography>

        <Button
          color="inherit"
          variant={location.pathname === "/" ? "outlined" : "text"}
          onClick={() => navigate("/")}
        >
          Dashboard
        </Button>

        <Button
          color="inherit"
          variant={location.pathname === "/monitoring" ? "outlined" : "text"}
          onClick={() => navigate("/monitoring")}
        >
          Gerenciar
        </Button>
      </Toolbar>
    </AppBar>
  );
}
