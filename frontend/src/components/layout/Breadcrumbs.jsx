import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import {
  Breadcrumbs as MuiBreadcrumbs,
  Link,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

import { routePaths } from "../../routes/routePaths";
import useAuth from "../../hooks/useAuth";

import {
  getNavigationItem,
  adminNavigationItems,
  employeeNavigationItems,
} from "./navigationConfig";

const Breadcrumbs = () => {
  const location = useLocation();
  const { user } = useAuth();

  const navigationItems =
    user?.role === "ADMIN"
      ? adminNavigationItems
      : employeeNavigationItems;

  const currentItem = getNavigationItem(
    location.pathname,
    navigationItems
  );

  const isDashboard =
    location.pathname === routePaths.dashboard ||
    location.pathname === routePaths.employeeDashboard;

  return (
    <MuiBreadcrumbs
      aria-label="Breadcrumb"
      separator={<ChevronRightRoundedIcon sx={{ fontSize: 14 }} />}
      sx={{
        mt: 0.25,
        color: 'text.secondary',
        '& .MuiBreadcrumbs-separator': { mx: 0.5 },
      }}
    >
      {isDashboard ? (
        <Typography color="text.secondary" variant="caption">
          Workspace
        </Typography>
      ) : (
        <Link
          component={RouterLink}
          to={routePaths.dashboard}
          color="text.secondary"
          underline="hover"
          variant="caption"
        >
          Workspace
        </Link>
      )}
      <Typography color="text.primary" variant="caption" fontWeight={600}>
        {currentItem?.label || 'Dashboard'}
      </Typography>
    </MuiBreadcrumbs>
  )
}

export default Breadcrumbs
