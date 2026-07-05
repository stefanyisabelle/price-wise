import { useEffect, useMemo, useState } from "react";

import {
  Alert,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@mui/material";

import Header from "../../components/Header/Header";
import EmptyState from "../../components/EmptyState/EmptyState";
import ProductCard from "../../components/ProductCard/ProductCard";

import { ProductRepository } from "../../repositories/ProductRepository";
import { type Product } from "../../models/Product";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function Dashboard() {
  const repository = useMemo(() => new ProductRepository(), []);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    repository
      .getProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        setError(String(err));
      })
      .finally(() => {
        setLoading(false);
      });
  }, [repository]);

  if (loading) {
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

  if (error) {
    return (
      <>
        <Header />

        <Container sx={{ mt: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Container>
      </>
    );
  }

  if (products.length === 0) {
    return (
      <>
        <Header />

        <Container sx={{ mt: 4 }}>
          <EmptyState message="Nenhum produto monitorado." />
        </Container>
      </>
    );
  }

  return (
    <>
      <PageTitle
        title="PriceWise"
        subtitle="Monitore preços e descubra o melhor momento para comprar."
      />
      <Header />

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          PriceWise
        </Typography>

        <Typography color="text.secondary" gutterBottom>
          Monitore preços e descubra o melhor momento para comprar.
        </Typography>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          {products.map((product) => (
            <Grid
              key={product.id}
              size={{
                xs: 12,
                md: 4,
              }}
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
