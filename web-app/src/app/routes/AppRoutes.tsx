import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import ProtectedRoute from '../guards/ProtectedRoute'
import RoleRoute from '../guards/RoleRoute'

import AuthLayout from '../layouts/AuthLayout/AuthLayout'
import CustomerLayout from '../layouts/CustomerLayout/CustomerLayout'
import StaffLayout from '../layouts/StaffLayout/StaffLayout'

import UnauthorizedPage from '../pages/UnauthorizedPage'

import LoginPage from '../../modules/authentication/pages/LoginPage'
import CustomerDashboard from '../../modules/customer/CustomerDashboard'
import StaffDashboard from '../../modules/staff/StaffDashboard'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Authentication Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPage />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>

          {/* Customer Routes */}
          <Route element={<RoleRoute allowedRoles={['CUSTOMER']} />}>
            <Route element={<CustomerLayout />}>
              <Route
                path="/dashboard"
                element={<CustomerDashboard />}
              />
            </Route>
          </Route>

          {/* Staff Routes */}
          <Route
            element={
              <RoleRoute
                allowedRoles={[
                  'AGENT',
                  'MANAGER',
                  'ADMIN',
                  'SUPER_ADMIN',
                ]}
              />
            }
          >
            <Route element={<StaffLayout />}>
              <Route
                path="/staff/dashboard"
                element={<StaffDashboard />}
              />
            </Route>
          </Route>

        </Route>

        {/* Unauthorized */}
        <Route
          path="/unauthorized"
          element={<UnauthorizedPage />}
        />

        {/* Default */}
        <Route
          path="*"
          element={<Navigate to="/auth/login" replace />}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes