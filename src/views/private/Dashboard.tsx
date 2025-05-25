import useAuth from "@/lib/useAuth"

export default function Dashboard() {
  const isAuthenticated = useAuth()

  if (!isAuthenticated) return null

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Bienvenido al Dashboard</h1>
      <p className="text-muted-foreground mt-2">Has iniciado sesión correctamente.</p>
    </div>
  )
}
