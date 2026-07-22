import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useTheme } from "@mui/material/styles";
import Breadcrumbs from "./Breadcrumbs";
import UserMenu from "./UserMenu";

const TopNavbar = ({ onMenuClick, onLogout, pageTitle, user }) => {

  const theme = useTheme();

  return (
  <Paper
    component="header"
    square
    elevation={0}
    sx={{
      position: "sticky",
      top: 0,
      zIndex: "appBar",
      display: "flex",
      minHeight: 72,
      alignItems: "center",
      px: { xs: 2, sm: 3 },
      borderBottom: "1px solid",
      borderColor: "divider",
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(0,0,0,0.92)"
          : "rgba(255,255,255,0.92)",
      backdropFilter: "blur(14px)",
    }}
  >
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >

      {/* Left Side */}
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{
          flex: 1,
        }}
      >
        <IconButton
          aria-label="Toggle navigation"
          onClick={onMenuClick}
          sx={{
            display: { lg: "none" },
            color: "text.secondary",
          }}
        >
          <MenuRoundedIcon />
        </IconButton>

        <Box sx={{ minWidth: 0 }}>
          <Typography
            component="h1"
            noWrap
            sx={{
              fontSize: {
                xs: "1rem",
                sm: "1.1rem",
                md: "1.25rem",
              },
              fontWeight: 600,
            }}
          >
            {pageTitle}
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            <Breadcrumbs />
          </Box>
        </Box>
      </Stack>

      {/* Right Side */}
      <Box>
        <UserMenu
          user={user}
          onLogout={onLogout}
        />
      </Box>

    </Box>
  </Paper>
  );
};

export default TopNavbar
