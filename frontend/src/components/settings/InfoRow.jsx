import { Stack, Typography } from "@mui/material";

export default function InfoRow({ label, value }) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="flex-start"
      spacing={2}
      sx={{ py: 0.75, width: "100%" }}
    >
      <Typography
        variant="body2"
        color="text.secondary"
      >
        {label}
      </Typography>

      <Typography
        variant="body2"
        fontWeight={600}
        textAlign="right"
        sx={{ minWidth: 0, overflowWrap: "anywhere" }}
      >
        {value}
      </Typography>
    </Stack>
  );
}
