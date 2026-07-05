import { Container, Typography, Alert } from "@mui/material";
import Header from "../../components/Header/Header";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function Monitoring() {
  return (
    <>
      <PageTitle title="Gerenciar" />
      <Header />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4">Gerenciar</Typography>

        <Alert sx={{ mt: 3 }} severity="info">
          Em breve você poderá: ✔ Escolher produtos ✔ Definir preço alvo ✔
          Escolher lojas monitoradas
        </Alert>
      </Container>
    </>
  );
}
