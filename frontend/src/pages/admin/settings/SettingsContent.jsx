import { Box } from "@mui/material";

import AccountTab from "./tabs/AccountTab";
import SecurityTab from "./tabs/SecurityTab";
import CompanyTab from "./tabs/CompanyTab";
import DashboardTab from "./tabs/DashboardTab";
import AppearanceTab from "./tabs/AppearanceTab";
import SystemTab from "./tabs/SystemTab";

export default function SettingsContent({ selectedTab }) {
  const renderContent = () => {
    switch (selectedTab) {
      case "account":
        return <AccountTab />;

      case "security":
        return <SecurityTab />;

      case "company":
        return <CompanyTab />;

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

  return <Box sx={{ width: "100%", minWidth: 0 }}>{renderContent()}</Box>;
}
