import { Button, Card, CardContent, Chip, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { type Product } from "../../models/Product";
import { formatCurrency } from "../../helpers/Helper";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const navigate = useNavigate();

  const isGoodPrice = product.currentPrice < product.averagePrice;

  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {product.category}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Preço atual
        </Typography>

        <Typography variant="h4" style={{ fontWeight: "bold" }}>
          R$ {formatCurrency(product.currentPrice)}
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Preço médio: {formatCurrency(product.averagePrice)}
        </Typography>

        <Typography
          variant="body2"
          color={isGoodPrice ? "success.main" : "warning.main"}
        >
          {isGoodPrice
            ? `Economia de ${formatCurrency(
                product.averagePrice - product.currentPrice
              )}`
            : "Preço dentro da média"}
        </Typography>

        <Chip
          sx={{ mt: 2 }}
          color={isGoodPrice ? "success" : "warning"}
          label={isGoodPrice ? "Bom momento" : "Dentro da média"}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => navigate(`/product/${product.id}`)}
        >
          Ver detalhes
        </Button>
      </CardContent>
    </Card>
  );
}
