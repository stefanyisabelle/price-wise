import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "75vh",
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            p: 5,
            borderRadius: 4,
            bgcolor: "background.paper",
            boxShadow: 4,
          }}
        >
          <PageTitle title="404" subtitle="Página não encontrada" />
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            A rota que você procurou não existe ou foi removida.
          </Typography>
          <Button
            variant="contained"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
          >
            Voltar para o dashboard
          </Button>
        </Box>
      </Container>
    </>
  );
}
