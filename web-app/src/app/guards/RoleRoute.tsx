import { Navigate, Outlet } from 'react-router-dom'
import type { UserRole } from '../../modules/authentication/types/auth.types'
import { useAppSelector } from '../../shared/hooks/redux'

interface RoleRouteProps {
  allowedRoles: UserRole[]
}

function RoleRoute({ allowedRoles }: RoleRouteProps) {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth/login" replace />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}

export default RoleRoute