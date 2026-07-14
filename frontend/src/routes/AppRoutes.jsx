import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/admin/Dashboard";
import Businesses from "../pages/admin/Businesses";
import UploadCSV from "../pages/admin/UploadCSV";

import LeadScores from "../pages/admin/LeadScores";

import CallLogs from "../pages/admin/CallLogs";
import Login from "../pages/auth/Login";

import { routePaths } from "./routePaths";

const AppRoutes = () => (
  <Routes>
    {/* Public Route */}
    <Route
      path={routePaths.login}
      element={<Login />}
    />

    {/* Protected Routes */}
    <Route element={<ProtectedRoute />}>
      <Route element={<DashboardLayout />}>
        <Route
          path={routePaths.dashboard}
          element={<Dashboard />}
        />

        <Route
          path={routePaths.businesses}
          element={<Businesses />}
        />

        <Route
          path={routePaths.upload}
          element={<UploadCSV />}
        />

        <Route
          path={routePaths.leadScores}
          element={<LeadScores />}
        />

        <Route
          path={routePaths.callLogs}
          element={<CallLogs />}
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
