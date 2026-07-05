import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { Box, Typography } from "@mui/material";

interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 6,
        p: 4,
        bgcolor: "background.paper",
        borderRadius: 4,
        boxShadow: 3,
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        <SentimentVeryDissatisfiedIcon sx={{ fontSize: 56, color: "primary.main" }} />
        <Typography variant="h6">{message}</Typography>
        <Typography color="text.secondary">
          Tente ajustar os filtros, aguarde novas ofertas ou volte mais tarde.
        </Typography>
      </Box>
    </Box>
  );
}
