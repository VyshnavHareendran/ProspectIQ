import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import SettingsSidebar from "./SettingsSidebar";
import SettingsContent from "./SettingsContent";

export default function Settings() {
  const [selectedTab, setSelectedTab] = useState("account");

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", overflowX: "hidden" }}>
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography variant="h4" fontWeight={700}>
          Settings
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mt: 0.75 }}>
          Manage your account, security, company, and application preferences.
        </Typography>
      </Box>

      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={3}
        alignItems="flex-start"
        sx={{ width: "100%" }}
      >
        <SettingsSidebar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
          <SettingsContent selectedTab={selectedTab} />
        </Box>
      </Stack>
    </Box>
  );
}
