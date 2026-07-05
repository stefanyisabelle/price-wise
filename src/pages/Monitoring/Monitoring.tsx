import { Box, Card, CardContent, Container, Typography } from "@mui/material";
import Header from "../../components/Header/Header";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function Monitoring() {
  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
        <PageTitle title="Gerenciar" subtitle="Em desenvolvimento" />

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
          <Card
            sx={{ borderRadius: 4, boxShadow: 1, bgcolor: "background.paper" }}
          >
            <CardContent>
              <Typography variant="h6">Em breve</Typography>
              <Box
                component="ul"
                sx={{ mt: 2, pl: 3, color: "text.secondary" }}
              >
                <li> Cadastrar produtos para monitorar </li>
                <li> Personalizar avisos de preço por item </li>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}
