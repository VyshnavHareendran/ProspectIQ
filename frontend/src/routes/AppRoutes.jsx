import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/admin/Dashboard";

import Businesses from "../pages/admin/Businesses";
import UploadCSV from "../pages/admin/UploadCSV";
import LeadScores from "../pages/admin/LeadScores";
import CallLogs from "../pages/admin/CallLogs";
import Followups from "../pages/admin/Followups";
import Login from "../pages/auth/Login";
import ChangePassword from "../pages/auth/ChangePassword";
import EmployeeManagement from "../pages/admin/EmployeeManagement";
import LeadAssignments from '../pages/admin/LeadAssignments';
import Settings from "../pages/admin/settings/Settings";
import EmployeePerformance from "../pages/admin/EmployeePerformance";

import { routePaths } from "./routePaths";

import EmployeeDashboard from "../pages/employee/Dashboard";
import TodaysCalls from "../pages/employee/TodaysCalls";
import MyLeads from "../pages/employee/MyLeads";
import MyCallLogs from "../pages/employee/MyCallLogs";
import MyFollowups from "../pages/employee/MyFollowups";
import Profile from "../pages/employee/Profile";


import RoleProtectedRoute from "../components/RoleProtectedRoute";


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

    {/* Protected Routes */}
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
              path={routePaths.employeePerformance}
              element={<EmployeePerformance />}
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
              path={routePaths.settings}
              element={<Settings />}
          />          

        </Route>
      </Route>
    </Route>

    <Route element={<ProtectedRoute />}>
      <Route element={<RoleProtectedRoute allowedRoles={["EMPLOYEE"]} />}>
        <Route element={<DashboardLayout />}>

          <Route
            path={routePaths.employeeDashboard}
            element={<EmployeeDashboard />}
          />

          <Route
              path={routePaths.employeeTodaysCalls}
              element={<TodaysCalls />}
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
