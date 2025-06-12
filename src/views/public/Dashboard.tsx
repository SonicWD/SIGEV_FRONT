"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  UserPlus,
  Stethoscope,
  Package,
  Syringe,
  FileText,
  User,
  Download,
  LogOut,
  Shield,
  Bell,
  Settings,
  Activity,
  Calendar,
  Heart,
  ClipboardList,
} from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"

interface Usuario {
  nombre: string
  rol: {
    id: number
    nombre: string
  }
  usuario: {
    nombre_usuario: string
    correo: string
  }
}

interface DashboardCard {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  color: string
}

export default function Dashboard() {
 const [usuario, setUsuario] = useState<Usuario | null>(null)
const [loading, setLoading] = useState(true)
const navigate = useNavigate()

useEffect(() => {
  // Verificar autenticación y cargar datos del usuario
  const accessToken = localStorage.getItem("accessToken")
  const usuarioData = localStorage.getItem("user")

  if (!accessToken || !usuarioData) {
    navigate("/dashboard")
    return
  }

  try {
    const parsedUsuario = JSON.parse(usuarioData)
    setUsuario(parsedUsuario)
  } catch (error) {
    console.error("Error parsing user data:", error)
    navigate("/dashboard")
  } finally {
    setLoading(false)
  }
}, [navigate])

const handleLogout = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("refresh")
  localStorage.removeItem("user")
  navigate("/iniciar-sesion")
}

  const getMenuItems = (rolId: number): DashboardCard[] => {
    switch (rolId) {
      case 1: // Admin
        return [
          {
            title: "Gestión de Usuarios",
            description: "Administrar usuarios del sistema",
            icon: Users,
            href: "/dashboard/usuarios",
            color: "from-blue-500 to-blue-600",
          },
          {
            title: "Gestión de Médicos",
            description: "Administrar personal médico",
            icon: Stethoscope,
            href: "/dashboard/medicos",
            color: "from-green-500 to-green-600",
          },
          {
            title: "Gestión de Pacientes",
            description: "Administrar pacientes registrados",
            icon: UserPlus,
            href: "/dashboard/pacientes",
            color: "from-purple-500 to-purple-600",
          },
          {
            title: "Gestión de Vacunas",
            description: "Administrar inventario de vacunas",
            icon: Package,
            href: "/dashboard/vacunas",
            color: "from-orange-500 to-orange-600",
          },
          {
            title: "Registro de Vacunaciones",
            description: "Registrar nuevas vacunaciones",
            icon: Syringe,
            href: "/dashboard/registrar-vacunacion",
            color: "from-emerald-500 to-emerald-600",
          },
          {
            title: "Historial de Vacunaciones",
            description: "Ver historial completo",
            icon: FileText,
            href: "/dashboard/historial",
            color: "from-cyan-500 to-cyan-600",
          },
        ]

      case 3: // Médico
        return [
          {
            title: "Mi Perfil",
            description: "Ver y editar información personal",
            icon: User,
            href: "/dashboard/perfil",
            color: "from-blue-500 to-blue-600",
          },
          {
            title: "Lista de Pacientes",
            description: "Ver pacientes asignados",
            icon: ClipboardList,
            href: "/dashboard/mis-pacientes",
            color: "from-green-500 to-green-600",
          },
          {
            title: "Registrar Vacunación",
            description: "Aplicar vacunas a pacientes",
            icon: Syringe,
            href: "/dashboard/registrar-vacunacion",
            color: "from-emerald-500 to-emerald-600",
          },
          {
            title: "Historial de Vacunación",
            description: "Ver vacunaciones aplicadas",
            icon: Activity,
            href: "/dashboard/mi-historial",
            color: "from-cyan-500 to-cyan-600",
          },
        ]

      case 2: // Paciente
        return [
          {
            title: "Mi Perfil",
            description: "Ver y editar información personal",
            icon: User,
            href: "/dashboard/perfil",
            color: "from-blue-500 to-blue-600",
          },
          {
            title: "Mis Vacunas",
            description: "Ver historial de vacunación",
            icon: Heart,
            href: "/dashboard/mis-vacunas",
            color: "from-green-500 to-green-600",
          },
          {
            title: "Descargar Carnet",
            description: "Obtener carnet de vacunación en PDF",
            icon: Download,
            href: "/dashboard/descargar-carnet",
            color: "from-purple-500 to-purple-600",
          },
        ]

      default:
        return []
    }
  }

  const getRoleBadgeColor = (rolId: number) => {
    switch (rolId) {
      case 1:
        return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
      case 2:
        return "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
      case 3:
        return "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-300"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  if (!usuario) {
    return null
  }

  const menuItems = getMenuItems(usuario.rol.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 p-2 rounded-xl shadow-md">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  SIGEV
                </h1>
                <p className="text-sm text-muted-foreground">Dashboard</p>
              </div>
            </div>

            {/* User Info & Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* User Info */}
              <div className="hidden md:flex items-center space-x-3 px-3 py-2 bg-muted/50 rounded-lg">
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">{usuario.nombre}</p>
                  <p className="text-xs text-muted-foreground">{usuario.usuario.correo}</p>
                </div>
                <Badge className={getRoleBadgeColor(usuario.rol.id)}>{usuario.rol.nombre}</Badge>
              </div>

              {/* Settings */}
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>

              {/* Logout */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </Button>
            </div>
          </div>

          {/* Mobile User Info */}
          <div className="md:hidden mt-4 flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-foreground">{usuario.nombre}</p>
              <p className="text-xs text-muted-foreground">{usuario.usuario.correo}</p>
            </div>
            <Badge className={getRoleBadgeColor(usuario.rol.id)}>{usuario.rol.nombre}</Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-2">
            <h2 className="text-3xl font-bold text-foreground">¡Hola, {usuario.nombre.split(" ")[0]}! 👋</h2>
          </div>
          <p className="text-lg text-muted-foreground">
            Bienvenido de vuelta al Sistema de Información para la Gestión de Esquemas de Vacunación
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">Estado del Sistema</p>
                  <p className="text-2xl font-bold">Activo</p>
                </div>
                <Activity className="h-8 w-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-100">Última Conexión</p>
                  <p className="text-2xl font-bold">Hoy</p>
                </div>
                <Calendar className="h-8 w-8 text-cyan-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Rol Activo</p>
                  <p className="text-2xl font-bold">{usuario.rol.nombre}</p>
                </div>
                <User className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Menu Items */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-foreground mb-6">Accesos Rápidos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm hover:-translate-y-2 cursor-pointer"
                onClick={() => navigate(item.href)}
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg text-foreground group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground">{item.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-foreground flex items-center">
              <Activity className="mr-3 h-5 w-5 text-emerald-600" />
              Actividad Reciente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Sesión iniciada correctamente</p>
                  <p className="text-xs text-muted-foreground">Hace unos momentos</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Dashboard cargado</p>
                  <p className="text-xs text-muted-foreground">Hace unos momentos</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
