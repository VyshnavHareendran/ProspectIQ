import { Divider, Stack, Typography } from "@mui/material";

export default function FormSection({ title, subtitle, children, divider = false }) {
  return (
    <Stack spacing={2.5}>
      {divider ? <Divider /> : null}
      <Stack spacing={0.5}>
        <Typography variant="subtitle1" fontWeight={700}>
          {title}
        </Typography>
        {subtitle ? (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        ) : null}
      </Stack>
      {children}
    </Stack>
  );
}
