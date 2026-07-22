import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import CloudDoneRoundedIcon from "@mui/icons-material/CloudDoneRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import WebAssetRoundedIcon from "@mui/icons-material/WebAssetRounded";

import { SettingsCard, SettingsHeader } from "../../../../components/settings";

const systemItems = [
  {
    label: "Application Version",
    value: "ProspectIQ CRM 2.4.0",
    icon: <DataObjectRoundedIcon />,
  },
  {
    label: "Environment",
    value: "Production",
    icon: <CloudDoneRoundedIcon />,
    chip: "Live",
    color: "success",
  },
  {
    label: "Database Status",
    value: "Connected",
    icon: <StorageRoundedIcon />,
    chip: "Healthy",
    color: "success",
  },
  {
    label: "API Status",
    value: "Operational",
    icon: <ApiRoundedIcon />,
    chip: "200 OK",
    color: "success",
  },
  {
    label: "Backend URL",
    value: "https://api.prospectiq.com",
    icon: <LinkRoundedIcon />,
  },
  {
    label: "Frontend Version",
    value: "React 19 + Vite",
    icon: <WebAssetRoundedIcon />,
  },
  {
    label: "Server Time",
    value: "20 Jul 2026, 09:25 AM IST",
    icon: <ScheduleRoundedIcon />,
  },
  {
    label: "Health Status",
    value: "All services available",
    icon: <HealthAndSafetyRoundedIcon />,
    chip: "Healthy",
    color: "success",
  },
];

export default function SystemTab() {
  return (
    <Box>
      <SettingsHeader
        title="System Information"
        subtitle="Read-only application, API, and infrastructure status."
      />

      <Grid container spacing={3}>
        {systemItems.map((item) => (
          <Grid key={item.label} size={{ xs: 12, md: 6 }}>
            <SettingsCard sx={{ height: "100%" }}>
              <Stack direction="row" spacing={2} alignItems="flex-start">
                <Box
                  sx={{
                    width: 42,
                    height: 42,
                    borderRadius: 2,
                    bgcolor: "action.hover",
                    color: "primary.main",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {item.icon}
                </Box>
                <Box sx={{ minWidth: 0, flex: 1 }}>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 0.75 }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {item.label}
                    </Typography>
                    {item.chip ? (
                      <Chip label={item.chip} color={item.color} size="small" />
                    ) : null}
                  </Stack>
                  <Typography fontWeight={700} sx={{ overflowWrap: "anywhere" }}>
                    {item.value}
                  </Typography>
                </Box>
              </Stack>
            </SettingsCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
