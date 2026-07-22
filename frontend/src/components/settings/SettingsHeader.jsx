import { Stack, Typography } from "@mui/material";

export default function SettingsHeader({ title, subtitle }) {
  return (
    <Stack spacing={0.75} sx={{ mb: 3 }}>
      <Typography variant="h5" fontWeight={700}>
        {title}
      </Typography>
      {subtitle ? (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      ) : null}
    </Stack>
  );
}
