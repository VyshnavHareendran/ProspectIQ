ximport { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../components/ProtectedRoute'
import DashboardLayout from '../layouts/DashboardLayout'
import Dashboard from '../pages/Dashboard'
import Business from '../pages/Business'
import Login from '../pages/Login'
import { routePaths } from './routePaths'

const AppRoutes = () => (
  <Routes>
    <Route path={routePaths.login} element={<Login />} />

    <Route element={<ProtectedRoute />}>
      <Route element={<DashboardLayout />}>
        <Route path={routePaths.dashboard} element={<Dashboard />} />
        <Route path="/businesses" element={<Business />} />
      </Route>
    </Route>

    <Route path="*" element={<Navigate to={routePaths.dashboard} replace />} />
  </Routes>
)

export default AppRoutes