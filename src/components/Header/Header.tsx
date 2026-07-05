import HomeIcon from "@mui/icons-material/Home";
import PollIcon from "@mui/icons-material/Poll";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { useLocation, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar
      position="static"
      elevation={4}
      sx={{
        background: "linear-gradient(90deg, #0d47a1 0%, #1565c0 100%)",
      }}
    >
      <Toolbar sx={{ flexWrap: "wrap", gap: 1 }}>
        <Box
          sx={{ display: "flex", alignItems: "center", flexGrow: 1, gap: 1 }}
        >
          <ShoppingBagIcon fontSize="large" sx={{ color: "#fff" }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#fff" }}>
            PriceWise
          </Typography>
        </Box>

        {isMobile ? (
          <>
            <Tooltip title="Dashboard" arrow>
              <IconButton color="inherit" onClick={() => navigate("/")}>
                <HomeIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Gerenciar" arrow>
              <IconButton
                color="inherit"
                onClick={() => navigate("/monitoring")}
              >
                <PollIcon />
              </IconButton>
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip title="Voltar ao dashboard" arrow>
              <Button
                color="inherit"
                startIcon={<HomeIcon />}
                variant={location.pathname === "/" ? "outlined" : "text"}
                onClick={() => navigate("/")}
              >
                Dashboard
              </Button>
            </Tooltip>

            <Tooltip title="Ir para a página de gerenciamento" arrow>
              <Button
                color="inherit"
                startIcon={<PollIcon />}
                variant={
                  location.pathname === "/monitoring" ? "outlined" : "text"
                }
                onClick={() => navigate("/monitoring")}
              >
                Gerenciar
              </Button>
            </Tooltip>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
