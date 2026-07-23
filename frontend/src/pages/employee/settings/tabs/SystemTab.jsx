import { useEffect, useState } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import ApiRoundedIcon from "@mui/icons-material/ApiRounded";
import CloudDoneRoundedIcon from "@mui/icons-material/CloudDoneRounded";
import DataObjectRoundedIcon from "@mui/icons-material/DataObjectRounded";
import HealthAndSafetyRoundedIcon from "@mui/icons-material/HealthAndSafetyRounded";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import WebAssetRoundedIcon from "@mui/icons-material/WebAssetRounded";

import {
  SettingsCard,
  SettingsHeader,
} from "../../../../components/settings";

import { employeeSystemService } from "../../../../services/employeeSettings/systemService";


export default function SystemTab() {
  const [systemInfo, setSystemInfo] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const loadSystemInfo = async () => {
      try {
        const response =
          await employeeSystemService.getSystem();

        setSystemInfo(response.data);
      } catch (error) {
        console.error(
          "Failed to load system information:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    void Promise.resolve().then(loadSystemInfo);
  }, []);


  const formatServerTime = (value) => {
    if (!value) return "N/A";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return value;
    }

    return date.toLocaleString();
  };


  if (loading) {
    return (
      <Box>
        <SettingsHeader
          title="System Information"
          subtitle="Read-only application, API, and infrastructure status."
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 8,
          }}
        >
          <CircularProgress />
        </Box>
      </Box>
    );
  }


  const systemItems = [
    {
      label: "Application Version",
      value: systemInfo?.application_version || "N/A",
      icon: <DataObjectRoundedIcon />,
    },
    {
      label: "Environment",
      value: systemInfo?.environment || "N/A",
      icon: <CloudDoneRoundedIcon />,
      chip: systemInfo?.environment || "Unknown",
      color: "success",
    },
    {
      label: "Database Status",
      value: systemInfo?.database_status || "N/A",
      icon: <StorageRoundedIcon />,
      chip: systemInfo?.database_status || "Unknown",
      color: "success",
    },
    {
      label: "API Status",
      value: systemInfo?.api_status || "N/A",
      icon: <ApiRoundedIcon />,
      chip: systemInfo?.api_status || "Unknown",
      color: "success",
    },
    {
      label: "Backend URL",
      value: systemInfo?.backend_url || "N/A",
      icon: <LinkRoundedIcon />,
    },
    {
      label: "Frontend Version",
      value: systemInfo?.frontend_version || "N/A",
      icon: <WebAssetRoundedIcon />,
    },
    {
      label: "Server Time",
      value: formatServerTime(
        systemInfo?.server_time
      ),
      icon: <ScheduleRoundedIcon />,
    },
    {
      label: "Health Status",
      value: systemInfo?.health_status || "N/A",
      icon: <HealthAndSafetyRoundedIcon />,
      chip: systemInfo?.health_status || "Unknown",
      color: "success",
    },
  ];


  return (
    <Box>
      <SettingsHeader
        title="System Information"
        subtitle="Read-only application, API, and infrastructure status."
      />

      <Grid container spacing={3}>
        {systemItems.map((item) => (
          <Grid
            key={item.label}
            size={{ xs: 12, md: 6 }}
          >
            <SettingsCard sx={{ height: "100%" }}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="flex-start"
              >
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

                <Box
                  sx={{
                    minWidth: 0,
                    flex: 1,
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 0.75 }}
                  >
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {item.label}
                    </Typography>

                    {item.chip ? (
                      <Chip
                        label={item.chip}
                        color={item.color}
                        size="small"
                      />
                    ) : null}
                  </Stack>

                  <Typography
                    fontWeight={700}
                    sx={{
                      overflowWrap: "anywhere",
                    }}
                  >
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