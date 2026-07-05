import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";

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

  useEffect(() => {
    repository.getProductById(Number(id)).then((data) => {
      setProduct(data as Product);
    });
  }, [id, repository]);

  if (!product) {
    return (
      <>
        <Header />

        <Container
          sx={{
            mt: 6,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Container>
      </>
    );
  }

  const isGoodPrice = product.currentPrice < product.averagePrice;

  return (
    <>
      <PageTitle title={product.name} />
      <Header />

      <Container sx={{ mt: 4 }}>
        <Button onClick={() => navigate("/")}>← Voltar</Button>

        <Typography variant="h4">{product.name}</Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          Preço atual
        </Typography>

        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          R$ {formatCurrency(product.currentPrice)}
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Preço médio: R$ {product.averagePrice.toFixed(2)}
        </Typography>

        <Box sx={{ mt: 2 }}>
          <Tooltip title="Comparação entre o preço atual e a média histórica">
            <Chip
              color={isGoodPrice ? "success" : "warning"}
              label={isGoodPrice ? "Bom preço" : "Preço dentro da média"}
            />
          </Tooltip>
        </Box>

        <Paper
          sx={{
            mt: 4,
            p: 3,
          }}
        >
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

                  <TableCell>R$ {store.price.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Typography
            variant="h6"
            sx={{
              mt: 4,
              mb: 2,
            }}
          >
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
        </Paper>
      </Container>
    </>
  );
}
