import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../shared/hooks/redux'
import { login } from '../../../store/slices/authSlice'
import type { UserRole } from '../types/auth.types'

const testUsers: Record<string, UserRole> = {
  'customer@taxedge.com': 'CUSTOMER',
  'agent@taxedge.com': 'AGENT',
  'manager@taxedge.com': 'MANAGER',
//   'admin@taxedge.com': 'ADMIN',
  'superadmin@taxedge.com': 'SUPER_ADMIN',
}

function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    const role = testUsers[email.toLowerCase()]

    if (!role || password !== '123456') {
      alert('Invalid test credentials')
      return
    }

    dispatch(
      login({
        user: {
          id: email,
          name: role.replace('_', ' '),
          email,
          role,
        },
        accessToken: 'temporary-test-token',
      }),
    )

    if (role === 'CUSTOMER') {
      navigate('/dashboard')
    } else {
      navigate('/staff/dashboard')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to TaxEdge
        </h1>

        <p className="mt-2 text-gray-500">
          Sign in to continue
        </p>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-4">
          <label className="mb-2 block text-sm font-medium">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full rounded-lg border px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white hover:bg-blue-700"
        >
          Sign In
        </button>

        <div className="mt-6 rounded-lg bg-gray-50 p-4 text-sm">
          <p className="font-semibold">Temporary test login</p>
          <p className="mt-2 text-gray-600">
            Password for all users: <b>123456</b>
          </p>
          <p className="mt-2 text-gray-500">
            customer@taxedge.com
            <br />
            agent@taxedge.com
            <br />
            manager@taxedge.com
            <br />
            superadmin@taxedge.com
          </p>
        </div>
      </form>
    </div>
  )
}

export default LoginPage