import { Box } from "@mui/material";

import AccountTab from "./tabs/AccountTab";
import SecurityTab from "./tabs/SecurityTab";
import DashboardTab from "./tabs/DashboardTab";
import AppearanceTab from "./tabs/AppearanceTab";
import SystemTab from "./tabs/SystemTab";

export default function EmployeeSettingsContent({ selectedTab }) {
  const renderContent = () => {
    switch (selectedTab) {
      case "account":
        return <AccountTab />;

      case "security":
        return <SecurityTab />;

      case "dashboard":
        return <DashboardTab />;

      case "appearance":
        return <AppearanceTab />;

      case "system":
        return <SystemTab />;

      default:
        return <AccountTab />;
    }
  };

  return (
    <Box sx={{ width: "100%", minWidth: 0 }}>
      {renderContent()}
    </Box>
  );
}