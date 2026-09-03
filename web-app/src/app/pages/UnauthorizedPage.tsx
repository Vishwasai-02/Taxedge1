import { Link } from 'react-router-dom'

function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Access Denied</h1>

      <p className="mt-2 text-gray-600">
        You do not have permission to access this page.
      </p>

      <Link
        to="/auth/login"
        className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-white"
      >
        Go to Login
      </Link>
    </div>
  )
}

export default UnauthorizedPage