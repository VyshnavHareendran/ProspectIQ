import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function EmployeeLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}