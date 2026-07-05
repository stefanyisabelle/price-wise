import { Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <Container>
        <h1>404</h1>

        <p>Página não encontrada.</p>

        <Button variant="contained" onClick={() => navigate("/")}>
          Voltar
        </Button>
      </Container>
    </>
  );
}
