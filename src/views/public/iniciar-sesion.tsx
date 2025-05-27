"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle, ArrowRight } from "lucide-react"
import api from "@/lib/api"

export default function IniciarSesion() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  })

  const securityFeatures = [
    "Encriptación de extremo a extremo",
    "Autenticación de dos factores",
    "Sesiones seguras con timeout automático",
    "Auditoría completa de accesos",
  ]
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  console.log("🟡 Iniciando intento de login...")

  try {
    const response = await api.post(`/users/login/`, {
      username: formData.username,
      password: formData.password,
    })

    console.log("🟢 Respuesta recibida:", response.data)

    const token = response.data.data?.access
    const refresh = response.data.data?.refresh
    const user = response.data.data?.usuario

    console.log("🔑 Token:", token)
    console.log("🔄 Refresh:", refresh)
    console.log("👤 Usuario:", user)

    if (token) {
      localStorage.setItem("accessToken", token)
      localStorage.setItem("refresh", refresh)
      localStorage.setItem("user", JSON.stringify(user))
      console.log("✅ Token y usuario guardados en localStorage")
      
      // Prueba 1: usando navigate
      navigate("/dashboard")
      console.log("➡️ Navegando a /dashboard con navigate()")
      
      // Si no redirige, prueba esto en su lugar:
      // window.location.href = "/dashboard"
    } else {
      console.warn("⚠️ No se recibió token del backend")
      alert("No se recibió token")
    }
  } catch (error) {
    console.error("❌ Error al iniciar sesión:", error)
    alert("Credenciales incorrectas")
  }
}

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Hero Section */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-8">
              <Badge className="mb-4 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800">
                <Shield className="w-4 h-4 mr-2" />
                Acceso Seguro
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
                Iniciar Sesión
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Accede a tu cuenta de SIGEV para gestionar esquemas de vacunación de forma segura y eficiente
              </p>
            </div>

            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
              {/* Login Form */}
              <div className="order-2 lg:order-1">
                <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-xl">
                  <CardHeader className="text-center pb-6">
                    <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Shield className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl text-foreground">Bienvenido de vuelta</CardTitle>
                    <p className="text-muted-foreground">Ingresa tus credenciales para continuar</p>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      {/* Username */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Usuario</label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                          <Input
                            placeholder="Ingresa tu usuario"
                            value={formData.username}
                            onChange={(e) => handleInputChange("username", e.target.value)}
                            className="pl-10 h-12 border-border focus:border-emerald-500 bg-background transition-all duration-300"
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Contraseña</label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Ingresa tu contraseña"
                            value={formData.password}
                            onChange={(e) => handleInputChange("password", e.target.value)}
                            className="pl-10 pr-12 h-12 border-border focus:border-emerald-500 bg-background transition-all duration-300"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>

                      {/* Remember & Forgot */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="remember"
                            checked={formData.remember}
                            onCheckedChange={(checked) => handleInputChange("remember", checked as boolean)}
                          />
                          <label htmlFor="remember" className="text-sm text-muted-foreground cursor-pointer">
                            Recordarme
                          </label>
                        </div>
                        <Button
                          variant="link"
                          className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 p-0 h-auto"
                        >
                          ¿Olvidaste tu contraseña?
                        </Button>
                      </div>

                      {/* Login Button */}
                      <Button className="w-full h-12 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium">
                        Iniciar Sesión
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>

                      {/* Divider */}
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">O continúa con</span>
                        </div>
                      </div>

                      {/* Alternative Login */}
                      <div className="grid grid-cols-2 gap-4">
                        <Button
                          variant="outline"
                          className="h-12 border-border hover:bg-muted transition-all duration-300"
                        >
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path
                              fill="currentColor"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="currentColor"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="currentColor"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                          Google
                        </Button>
                        <Button
                          variant="outline"
                          className="h-12 border-border hover:bg-muted transition-all duration-300"
                        >
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                          Facebook
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>

                {/* Support Links */}
                <div className="text-center mt-6">
                  <p className="text-muted-foreground mb-4">¿Necesitas ayuda para acceder?</p>
                  <div className="flex justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                    >
                      Contactar Soporte
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 dark:hover:bg-cyan-950"
                    >
                      Ver Ayuda
                    </Button>
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="order-1 lg:order-2 space-y-6">
                {/* Security Notice */}
                <Card className="border-0 bg-emerald-50/80 dark:bg-emerald-950/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-emerald-800 dark:text-emerald-200 mb-2">
                          Acceso Seguro
                        </h4>
                        <p className="text-sm text-emerald-700 dark:text-emerald-300 leading-relaxed">
                          Tu sesión está protegida con los más altos estándares de seguridad. Nunca compartas tus
                          credenciales de acceso con terceros.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Features */}
                <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground flex items-center">
                      <Shield className="mr-3 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                      Características de Seguridad
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {securityFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <CheckCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* System Info */}
                <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-xl text-foreground">Acceso al Sistema</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Usuarios activos</span>
                        <Badge className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                          24/7
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Tiempo de respuesta</span>
                        <Badge className="bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300">
                          {"< 2s"}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span className="text-sm text-muted-foreground">Disponibilidad</span>
                        <Badge className="bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300">
                          99.9%
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-16 px-4 bg-muted/30">
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">¿Primera vez en SIGEV?</h3>
              <p className="text-lg text-muted-foreground mb-8">
                Explora nuestro sistema con una demostración interactiva antes de solicitar acceso completo
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all duration-300 hover:scale-105"
                >
                  Ver Demo Interactiva
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 dark:hover:bg-cyan-950 transition-all duration-300 hover:scale-105"
                >
                  Solicitar Acceso
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
