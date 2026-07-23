import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import EmployeeSettingsSidebar from "./EmployeeSettingsSidebar";
import EmployeeSettingsContent from "./EmployeeSettingsContent";

export default function Settings() {
  const [selectedTab, setSelectedTab] = useState("account");

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", overflowX: "hidden" }}>
      <Box sx={{ mb: { xs: 3, md: 4 } }}>
        <Typography variant="h4" fontWeight={700}>
          Settings
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 0.75 }}
        >
          Manage your account, security and application preferences.
        </Typography>
      </Box>

      <Stack
        direction={{ xs: "column", lg: "row" }}
        spacing={3}
        alignItems="flex-start"
        sx={{ width: "100%" }}
      >
        <EmployeeSettingsSidebar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        <Box sx={{ flex: 1, minWidth: 0, width: "100%" }}>
          <EmployeeSettingsContent selectedTab={selectedTab} />
        </Box>
      </Stack>
    </Box>
  );
}