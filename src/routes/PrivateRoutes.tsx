import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import useAuth from "@/lib/useAuth"
const Dashboard = lazy(() => import("@/views/private/Dashboard"))

export default function PrivateRoutes() {
  const isAuthenticated = useAuth()

  if (!isAuthenticated) return null

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<div className="p-4 text-sm">Cargando dashboard...</div>}>
            <Dashboard />
          </Suspense>
        }
      />
    </Routes>
  )
}
