import { useEffect, useMemo, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StorefrontIcon from "@mui/icons-material/Storefront";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import Header from "../../components/Header/Header";
import { type Product } from "../../models/Product";
import { ProductRepository } from "../../repositories/ProductRepository";
import PageTitle from "../../components/PageTitle/PageTitle";
import { formatCurrency } from "../../helpers/Helper";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const repository = useMemo(() => new ProductRepository(), []);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    repository
      .getProductById(Number(id))
      .then((data) => {
        if (!data) {
          setNotFound(true);
          setProduct(null);
          return;
        }

        setProduct(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, repository]);

  if (loading) {
    return (
      <>
        <Header />

        <Container
          sx={{
            mt: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <CircularProgress />
          <Typography color="text.secondary">
            Carregando informações do produto...
          </Typography>
        </Container>
      </>
    );
  }

  if (notFound) {
    return (
      <>
        <Header />

        <Container sx={{ mt: 6 }}>
          <Typography variant="h5" gutterBottom>
            Produto não encontrado
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            O produto que você tentou acessar não está disponível.
          </Typography>
          <Button variant="contained" onClick={() => navigate("/")}>
            Voltar ao dashboard
          </Button>
        </Container>
      </>
    );
  }

  if (!product) {
    return null;
  }

  const isGoodPrice = product.currentPrice < product.averagePrice;
  const savedValue = product.averagePrice - product.currentPrice;
  const targetReached = product.currentPrice <= product.targetPrice;

  return (
    <>
      <Header />

      <Container maxWidth="lg" sx={{ mt: 4, pb: 6 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{ mb: 3 }}
        >
          Voltar ao dashboard
        </Button>

        <PageTitle
          title={product.name}
          subtitle="Detalhes completos de preço e histórico."
        />

        <Box
          sx={{
            display: "grid",
            gap: 3,
            gridTemplateColumns: "1fr",
            mt: 2,
            "@media (min-width: 900px)": {
              gridTemplateColumns: "2fr 1fr",
            },
          }}
        >
          <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
            <Typography variant="subtitle2" color="text.secondary">
              Preço atual
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>
              {formatCurrency(product.currentPrice)}
            </Typography>
            <Chip
              sx={{ mt: 2 }}
              color={isGoodPrice ? "success" : "warning"}
              label={isGoodPrice ? "Preço abaixo da média" : "Dentro da média"}
              icon={<TrendingDownIcon />}
            />

            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                mt: 4,
              }}
            >
              <Card sx={{ p: 2, borderRadius: 3, minHeight: 130 }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Preço médio histórico
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1, fontWeight: 700 }}>
                    {formatCurrency(product.averagePrice)}
                  </Typography>
                </CardContent>
              </Card>

              <Card sx={{ p: 2, borderRadius: 3, minHeight: 130 }}>
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Preço alvo
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1, fontWeight: 700 }}>
                    {formatCurrency(product.targetPrice)}
                  </Typography>
                  <Typography
                    color={targetReached ? "success.main" : "warning.main"}
                    sx={{ mt: 1 }}
                  >
                    {targetReached ? "Meta atingida" : "Aguardando redução"}
                  </Typography>
                </CardContent>
              </Card>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Comparativo por loja
              </Typography>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Loja</TableCell>
                    <TableCell>Preço</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {product.stores.map((store) => (
                    <TableRow key={store.store}>
                      <TableCell>{store.store}</TableCell>
                      <TableCell>{formatCurrency(store.price)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Histórico de preços
              </Typography>

              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Mês</TableCell>
                    <TableCell>Preço</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {product.history.map((item) => (
                    <TableRow key={item.month}>
                      <TableCell>{item.month}</TableCell>
                      <TableCell>R$ {item.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Paper>

          <Box sx={{ display: "grid", gap: 3 }}>
            <Card sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Resumo rápido
                </Typography>
                <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>
                  {product.name}
                </Typography>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mt: 2 }}
                >
                  <StorefrontIcon color="primary" />
                  <Typography>
                    {product.stores.length} lojas pesquisadas
                  </Typography>
                </Box>
                <Typography sx={{ mt: 2 }}>
                  Você economiza {formatCurrency(savedValue)} comparado ao preço
                  médio.
                </Typography>
              </CardContent>
            </Card>

            <Paper sx={{ p: 3, borderRadius: 4, boxShadow: 1 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Dica de compra
              </Typography>
              <Typography sx={{ mt: 2 }}>
                {targetReached
                  ? "Este produto já está abaixo da sua meta de preço. Aproveite a oferta antes que suba de novo."
                  : "Fique de olho: o preço atual está abaixo da média, mas ainda acima do seu objetivo."}
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Container>
    </>
  );
}
