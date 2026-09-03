import { Outlet } from 'react-router-dom'

function StaffLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white px-6 py-4">
        <h1 className="text-xl font-bold">TaxEdge Staff</h1>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default StaffLayout