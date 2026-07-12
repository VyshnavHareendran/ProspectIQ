import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import Business from "../pages/Business";
import UploadCSV from "../pages/UploadCSV";
import LeadScores from "../pages/LeadScores";
import Login from "../pages/Login";

import { routePaths } from "./routePaths";

const AppRoutes = () => (
  <Routes>
    {/* Public Route */}
    <Route path={routePaths.login} element={<Login />} />

    {/* Protected Routes */}
    <Route element={<ProtectedRoute />}>
      <Route element={<DashboardLayout />}>
        <Route
          path={routePaths.dashboard}
          element={<Dashboard />}
        />

        <Route
          path={routePaths.businesses}
          element={<Business />}
        />

        <Route
          path={routePaths.upload}
          element={<UploadCSV />}
        />

        <Route
          path={routePaths.leadScores}
          element={<LeadScores />}
        />
      </Route>
    </Route>

    {/* Fallback */}
    <Route
      path="*"
      element={<Navigate to={routePaths.dashboard} replace />}
    />
  </Routes>
);

export default AppRoutes;
