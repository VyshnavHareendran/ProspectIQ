import { Paper } from "@mui/material";

export default function SettingsCard({ children, sx }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, sm: 3 },
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04)",
        ...sx,
      }}
    >
      {children}
    </Paper>
  );
}
