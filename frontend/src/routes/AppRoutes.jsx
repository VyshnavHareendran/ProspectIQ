import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import RoleProtectedRoute from "../components/RoleProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import { routePaths } from "./routePaths";

// Auth Pages
import Login from "../pages/auth/Login";
import ChangePassword from "../pages/auth/ChangePassword";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import Businesses from "../pages/admin/Businesses";
import UploadCSV from "../pages/admin/UploadCSV";
import LeadScores from "../pages/admin/LeadScores";
import CallLogs from "../pages/admin/CallLogs";
import Followups from "../pages/admin/Followups";
import EmployeeManagement from "../pages/admin/EmployeeManagement";
import LeadAssignments from "../pages/admin/LeadAssignments";
import Reports from "../pages/admin/Reports";

// Employee Pages
import EmployeeDashboard from "../pages/employee/Dashboard";
import MyLeads from "../pages/employee/MyLeads";
import MyCallLogs from "../pages/employee/MyCallLogs";
import MyFollowups from "../pages/employee/MyFollowups";
import Profile from "../pages/employee/Profile";

const AppRoutes = () => (
  <Routes>
    {/* Public Route */}
    <Route
      path={routePaths.login}
      element={<Login />}
    />

    {/* Change Password */}
    <Route element={<ProtectedRoute />}>
      <Route
        path={routePaths.changePassword}
        element={<ChangePassword />}
      />
    </Route>

    {/* Admin Routes */}
    <Route element={<ProtectedRoute />}>
      <Route element={<RoleProtectedRoute allowedRoles={["ADMIN"]} />}>
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
            path={routePaths.callLogs}
            element={<CallLogs />}
          />

          <Route
            path={routePaths.leadScores}
            element={<LeadScores />}
          />

          <Route
            path={routePaths.leadAssignments}
            element={<LeadAssignments />}
          />

          <Route
            path={routePaths.employeeManagement}
            element={<EmployeeManagement />}
          />

          <Route
            path={routePaths.followups}
            element={<Followups />}
          />

          <Route
            path={routePaths.reports}
            element={<Reports />}
          />

        </Route>
      </Route>
    </Route>

    {/* Employee Routes */}
    <Route element={<ProtectedRoute />}>
      <Route element={<RoleProtectedRoute allowedRoles={["EMPLOYEE"]} />}>
        <Route element={<DashboardLayout />}>

          <Route
            path={routePaths.employeeDashboard}
            element={<EmployeeDashboard />}
          />

          <Route
            path={routePaths.employeeMyLeads}
            element={<MyLeads />}
          />

          <Route
            path={routePaths.employeeMyCallLogs}
            element={<MyCallLogs />}
          />

          <Route
            path={routePaths.employeeMyFollowups}
            element={<MyFollowups />}
          />

          <Route
            path={routePaths.employeeProfile}
            element={<Profile />}
          />

        </Route>
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