import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import StorefrontIcon from "@mui/icons-material/Storefront";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

import { type Product } from "../../models/Product";
import { formatCurrency } from "../../helpers/Helper";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isGoodPrice = product.currentPrice < product.averagePrice;

  return (
    <Card
      elevation={5}
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: 1.25,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            gap: 1,
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{ fontSize: isMobile ? "1rem" : "1.1rem" }}
            >
              {product.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {product.category}
            </Typography>
          </Box>

          <Chip
            icon={<StorefrontIcon />}
            label={product.category}
            variant="outlined"
            size="small"
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: 1,
            alignItems: "flex-start",
          }}
        >
          <Box sx={{ flex: "1 1 30%", minWidth: 110 }}>
            <Typography variant="caption" color="text.secondary">
              Atual
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
              {formatCurrency(product.currentPrice)}
            </Typography>
          </Box>

          <Box sx={{ flex: "1 1 30%", minWidth: 110 }}>
            <Typography variant="caption" color="text.secondary">
              Média
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
              {formatCurrency(product.averagePrice)}
            </Typography>
          </Box>

          <Box sx={{ flex: "1 1 30%", minWidth: 110 }}>
            <Typography variant="caption" color="text.secondary">
              Meta
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
              {formatCurrency(product.targetPrice)}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 1,
            mt: 1,
            flexWrap: "wrap",
          }}
        >
          <Chip
            icon={isGoodPrice ? <TrendingDownIcon /> : <TrendingFlatIcon />}
            color={isGoodPrice ? "success" : "warning"}
            label={
              isGoodPrice
                ? `Economia ${formatCurrency(product.averagePrice - product.currentPrice)}`
                : "Na média"
            }
            size="small"
          />
        </Box>
      </CardContent>

      <Button
        fullWidth
        variant="contained"
        startIcon={<PriceCheckIcon />}
        sx={{ borderRadius: 0, py: 1.5 }}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        Ver detalhes
      </Button>
    </Card>
  );
}
