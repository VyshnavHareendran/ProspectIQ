import { useEffect, useState } from "react";
import { Box, Divider, Button, Grid, MenuItem, Stack, TextField } from "@mui/material";

import {
  SettingsCard,
  SettingsHeader,
  SwitchSetting,
} from "../../../../components/settings";
import { settingsApi } from "../../../../api/admin/settingsApi";


export default function DashboardTab() {
  const [settings, setSettings] = useState({
    recentActivities: true,
    statistics: true,
    charts: true,
    defaultLandingPage: "dashboard",
  });
  const [loading, setLoading] = useState(false);

  const setValue = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const loadDashboardSettings = async () => {

      try {

          const response = await settingsApi.getDashboard();

          setSettings({

              recentActivities: response.data.recent_activities,

              statistics: response.data.statistics,

              charts: response.data.charts,

              defaultLandingPage: response.data.default_landing_page,

          });

      } catch (error) {

          console.error(error);

      }

  };

  useEffect(() => {

      void Promise.resolve().then(loadDashboardSettings);

  }, []);

  const handleSave = async () => {

      try {

          setLoading(true);

          await settingsApi.updateDashboard({

              recent_activities: settings.recentActivities,

              statistics: settings.statistics,

              charts: settings.charts,

              default_landing_page: settings.defaultLandingPage,

          });

      } catch (error) {

          console.error(error);

      } finally {

          setLoading(false);

      }

  };

  return (
    <Box>
      <SettingsHeader
        title="Dashboard Settings"
        subtitle="Customize the default admin dashboard view and visible widgets."
      />

      <Stack spacing={3}>
        <SettingsCard>
          <Stack divider={<Divider flexItem />} spacing={0}>
            <SwitchSetting
              label="Recent Activities"
              description="Show latest uploads, lead actions, and call activity."
              checked={settings.recentActivities}
              onChange={(event) => setValue("recentActivities", event.target.checked)}
            />
            <SwitchSetting
              label="Statistics"
              description="Display KPI summary cards at the top of the dashboard."
              checked={settings.statistics}
              onChange={(event) => setValue("statistics", event.target.checked)}
            />
            <SwitchSetting
              label="Charts"
              description="Show visual lead assignment and category analytics."
              checked={settings.charts}
              onChange={(event) => setValue("charts", event.target.checked)}
            />
          </Stack>
        </SettingsCard>

        <SettingsCard>
          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                select
                fullWidth
                label="Default Landing Page"
                value={settings.defaultLandingPage}
                onChange={(event) => setValue("defaultLandingPage", event.target.value)}
              >
                <MenuItem value="dashboard">Dashboard</MenuItem>
                <MenuItem value="reports">Reports</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </SettingsCard>
        <Button
            variant="contained"
            onClick={handleSave}
            disabled={loading}
        >
            {loading ? "Saving..." : "Save Dashboard Settings"}
        </Button>
      </Stack>
    </Box>
  );
}
