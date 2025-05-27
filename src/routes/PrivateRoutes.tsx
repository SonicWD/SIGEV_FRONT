import { lazy, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import useAuth from "@/lib/useAuth"

const Dashboard = lazy(() => import("@/views/private/Dashboard"))
const Pacientes = lazy(() => import("@/views/private/Pacientes"))

export default function PrivateRoutes() {
const { isAuthenticated, loading } = useAuth()

  if (loading) return <div className="text-center mt-10 text-muted-foreground">Verificando sesión...</div>
  if (!isAuthenticated) return null // Ya redirige desde el hook

  return (
    <Suspense fallback={<div className="text-center mt-10 text-emerald-600">Cargando...</div>}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/usuarios" element={<div>Gestión de Usuarios</div>} />
        <Route path="/medicos" element={<div>Gestión de Médicos</div>} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/vacunas" element={<div>Gestión de Vacunas</div>} />
        <Route path="/registrar-vacunacion" element={<div>Registrar Vacunación</div>} />
        <Route path="/historial" element={<div>Historial de Vacunaciones</div>} />
        <Route path="/perfil" element={<div>Mi Perfil</div>} />
        <Route path="/mis-pacientes" element={<div>Mis Pacientes</div>} />
        <Route path="/mi-historial" element={<div>Mi Historial</div>} />
        <Route path="/mis-vacunas" element={<div>Mis Vacunas</div>} />
        <Route path="/descargar-carnet" element={<div>Descargar Carnet</div>} />
      </Routes>
    </Suspense>
  )
}
