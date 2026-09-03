import { Outlet } from 'react-router-dom'

function CustomerLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white px-6 py-4">
        <h1 className="text-xl font-bold">TaxEdge</h1>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default CustomerLayout