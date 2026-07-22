import {
  Box,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import BusinessRoundedIcon from "@mui/icons-material/BusinessRounded";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const menuItems = [
  {
    id: "account",
    label: "Account",
    icon: <PersonOutlineRoundedIcon />,
  },
  {
    id: "security",
    label: "Security",
    icon: <SecurityRoundedIcon />,
  },
  {
    id: "company",
    label: "Company",
    icon: <BusinessRoundedIcon />,
  },
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <DashboardCustomizeRoundedIcon />,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: <PaletteRoundedIcon />,
  },
  {
    id: "system",
    label: "System",
    icon: <InfoOutlinedIcon />,
  },
];

export default function SettingsSidebar({
  selectedTab,
  setSelectedTab,
}) {
  return (
    <Box
      sx={{
        width: { xs: "100%", lg: 280 },
        flex: { lg: "0 0 280px" },
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 2,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 3,
          boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04)",
        }}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          Settings
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          Manage your account and application preferences.
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <List disablePadding>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.id}
              selected={selectedTab === item.id}
              onClick={() => setSelectedTab(item.id)}
              sx={{
                borderRadius: 2,
                mb: 0.5,

                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  color: "#fff",

                  "& .MuiListItemIcon-root": {
                    color: "#fff",
                  },

                  "& .MuiListItemText-primary": {
                    fontWeight: 600,
                  },
                },

                "&:hover": {
                  bgcolor:
                    selectedTab === item.id ? "primary.dark" : "action.hover",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color:
                    selectedTab === item.id
                      ? "#fff"
                      : "text.secondary",
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
