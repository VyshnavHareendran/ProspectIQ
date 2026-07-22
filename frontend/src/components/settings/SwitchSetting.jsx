import { FormControlLabel, Stack, Switch, Typography } from "@mui/material";

export default function SwitchSetting({ checked, description, label, onChange }) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={2}
      justifyContent="space-between"
      alignItems={{ xs: "flex-start", sm: "center" }}
      sx={{ py: 1.25 }}
    >
      <Stack spacing={0.35}>
        <Typography variant="body1" fontWeight={600}>
          {label}
        </Typography>
        {description ? (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        ) : null}
      </Stack>
      <FormControlLabel
        control={<Switch checked={checked} onChange={onChange} />}
        label=""
        sx={{ m: 0 }}
      />
    </Stack>
  );
}
