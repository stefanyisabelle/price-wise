import { useCallback, useEffect, useMemo, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

import Header from "../../components/Header/Header";
import EmptyState from "../../components/EmptyState/EmptyState";
import ProductCard from "../../components/ProductCard/ProductCard";

import { ProductRepository } from "../../repositories/ProductRepository";
import { type Product } from "../../models/Product";
import { formatCurrency } from "../../helpers/Helper";

const categories = ["Todos", "Higiene", "Eletrônico"] as const;

type CategoryFilter = (typeof categories)[number];

export default function Dashboard() {
  const repository = useMemo(() => new ProductRepository(), []);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("Todos");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProducts = useCallback(() => {
    setLoading(true);
    setError("");

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

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const normalizedSearch = searchTerm.trim().toLowerCase();
        const matchesSearch =
          normalizedSearch.length === 0 ||
          product.name.toLowerCase().includes(normalizedSearch) ||
          product.category.toLowerCase().includes(normalizedSearch);
        const matchesCategory =
          categoryFilter === "Todos" || product.category === categoryFilter;

        return matchesSearch && matchesCategory;
      }),
    [products, searchTerm, categoryFilter]
  );

  const goodDeals = useMemo(
    () =>
      products.filter((product) => product.currentPrice < product.averagePrice)
        .length,
    [products]
  );

  const averageSaving = useMemo(() => {
    if (!products.length) {
      return 0;
    }

    const totalSaving = products.reduce(
      (acc, product) =>
        acc + Math.max(0, product.averagePrice - product.currentPrice),
      0
    );

    return totalSaving / products.length;
  }, [products]);

  if (loading) {
    return (
      <>
        <Header />

        <Container
          sx={{
            mt: 6,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Sincronizando
          </Typography>
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
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>

          <Button variant="contained" onClick={loadProducts}>
            Recarregar
          </Button>
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
      <Header />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
        <Box
          sx={{
            p: 4,
            borderRadius: 4,
            background:
              "linear-gradient(135deg, rgba(21, 101, 192, 0.16), rgba(255, 255, 255, 0.95))",
            boxShadow: 3,
            mb: 4,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
            PriceWise
          </Typography>
          <Typography color="text.secondary" sx={{ maxWidth: 680, mt: 1 }}>
            Monitore preços e descubra o melhor momento para comprar. Compare
            valores, acompanhe metas de preço e receba informações visuais sobre
            quais produtos estão com descontos reais.
          </Typography>
        </Box>

        <Paper
          elevation={2}
          sx={{ p: 3, mb: 3, borderRadius: 4, bgcolor: "background.paper" }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 2,
              alignItems: isMobile ? "stretch" : "center",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                width: "100%",
              }}
            >
              <SearchIcon color="action" />
              <TextField
                fullWidth
                variant="outlined"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Buscar produto ou categoria"
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: isMobile ? "nowrap" : "wrap",
                overflowX: isMobile ? "auto" : "visible",
                py: isMobile ? 1 : 0,
                justifyContent: isMobile ? "flex-start" : "flex-end",
                // light custom scrollbar for mobile
                "&::-webkit-scrollbar": isMobile ? { height: 6 } : undefined,
                "&::-webkit-scrollbar-thumb": isMobile
                  ? { backgroundColor: "rgba(0,0,0,0.18)", borderRadius: 3 }
                  : undefined,
              }}
            >
              {categories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  size="small"
                  clickable
                  color={categoryFilter === category ? "primary" : "default"}
                  onClick={() => setCategoryFilter(category)}
                  sx={{ flex: isMobile ? "0 0 auto" : undefined }}
                  aria-label={`Filtrar ${category}`}
                />
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              mt: 2,
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 1,
              justifyContent: "flex-start",
              alignItems: isMobile ? "flex-start" : "center",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {filteredProducts.length} produto(s) encontrado(s)
            </Typography>
          </Box>
        </Paper>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mb: 4,
            justifyContent: "space-between",
          }}
        >
          <Paper
            sx={{
              flex: "1 1 30%",
              minWidth: 140,
              p: 2,
              borderRadius: 3,
              boxShadow: 1,
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Produtos monitorados
            </Typography>
            <Typography variant="h4" sx={{ mt: 1, fontWeight: 700 }}>
              {products.length}
            </Typography>
          </Paper>

          <Paper
            sx={{
              flex: "1 1 30%",
              minWidth: 140,
              p: 2,
              borderRadius: 3,
              boxShadow: 1,
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Boas ofertas
            </Typography>
            <Typography variant="h4" sx={{ mt: 1, fontWeight: 700 }}>
              {goodDeals}
            </Typography>
          </Paper>

          <Paper
            sx={{
              flex: "1 1 30%",
              minWidth: 140,
              p: 2,
              borderRadius: 3,
              boxShadow: 1,
              textAlign: "center",
            }}
          >
            <Typography variant="subtitle2" color="text.secondary">
              Economia média
            </Typography>
            <Typography variant="h4" sx={{ mt: 1, fontWeight: 700 }}>
              {formatCurrency(averageSaving)}
            </Typography>
          </Paper>
        </Box>

        {filteredProducts.length === 0 ? (
          <Alert severity="info" sx={{ mt: 4 }}>
            Nenhum produto encontrado com esses filtros. Tente limpar a busca ou
            selecionar outra categoria.
          </Alert>
        ) : (
          <Box
            sx={{
              display: "grid",
              gap: isMobile ? 8 : 16,
              gridTemplateColumns: isMobile
                ? "1fr"
                : "repeat(auto-fit, minmax(280px, 1fr))",
            }}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        )}
      </Container>
    </>
  );
}
