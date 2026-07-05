import { Typography } from "@mui/material";

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export default function PageTitle({ title, subtitle }: PageTitleProps) {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>

      {subtitle && (
        <Typography color="text.secondary" gutterBottom>
          {subtitle}
        </Typography>
      )}
    </>
  );
}
