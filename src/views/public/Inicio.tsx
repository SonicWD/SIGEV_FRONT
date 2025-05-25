"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Package,
  FileText,
  Heart,
  Stethoscope,
  Activity,
  Calendar,
  Bell,
  TrendingUp,
  CheckCircle,
  Shield,
  Scale,
  Globe,
  Layers,
  UserCheck,
} from "lucide-react"
import rawFeatures from "@/data/features.json"
import rawUpdates from "@/data/updates.json"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const iconMap = { Users, Package, FileText }
const features = rawFeatures.map((item) => ({
  ...item,
  icon: iconMap[item.icon as keyof typeof iconMap],
}))

const updates = rawUpdates

export default function Inicio() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <Badge className="mb-6 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-colors border-emerald-200 dark:border-emerald-800 shadow-sm">
              <Heart className="w-4 h-4 mr-2" />
              Hospital San Antonio de Guatavita
            </Badge>
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Gestión Inteligente de Vacunación
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Bienvenido a SIGEV, la plataforma digital que revoluciona la gestión de esquemas de vacunación en
              instituciones de salud, garantizando seguridad, eficiencia y trazabilidad completa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 hover:scale-105"
              >
                <Stethoscope className="mr-2 h-5 w-5" />
                Explorar Sistema
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all duration-300 px-8 py-3 hover:scale-105 hover:shadow-md"
              >
                <Activity className="mr-2 h-5 w-5" />
                Ver Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Funcionalidades Principales</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Herramientas diseñadas para optimizar cada aspecto de la gestión de vacunación
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm hover:-translate-y-2 hover:scale-105"
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-950 dark:to-cyan-950 rounded-xl group-hover:from-emerald-200 group-hover:to-cyan-200 dark:group-hover:from-emerald-900 dark:group-hover:to-cyan-900 transition-all duration-300 group-hover:scale-110 shadow-sm">
                    <feature.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors" />
                  </div>
                  <CardTitle className="text-xl text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-muted-foreground leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Updates Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Últimas Actualizaciones</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Mantente al día con las mejoras y nuevas funcionalidades del sistema
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-6">
            {updates.map((update, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-emerald-500 bg-card/80 backdrop-blur-sm hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge
                          variant="secondary"
                          className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-900 transition-colors"
                        >
                          {update.type === "feature" && <TrendingUp className="w-3 h-3 mr-1" />}
                          {update.type === "update" && <Bell className="w-3 h-3 mr-1" />}
                          {update.type === "improvement" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {update.type === "feature"
                            ? "Nueva Función"
                            : update.type === "update"
                              ? "Actualización"
                              : "Mejora"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{update.date}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                        {update.title}
                      </h4>
                      <p className="text-muted-foreground">{update.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Privacy Commitment Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-cyan-600 rounded-xl shadow-lg mr-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Compromiso con la Seguridad y la Privacidad
                </h2>
              </div>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                SIGEV está diseñado bajo los más altos estándares de seguridad, privacidad e interoperabilidad,
                cumpliendo con normativas nacionales e internacionales para garantizar la protección de datos sensibles
                en el sector salud.
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Normativas Colombianas */}
              <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center">
                    <Scale className="mr-3 h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    Cumplimiento Normativo Nacional
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-foreground">Ley 1581 de 2012:</span>
                        <span className="text-muted-foreground ml-1">
                          Protección integral de datos personales con consentimiento informado y derechos ARCO.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-foreground">Ley 2015 de 2020:</span>
                        <span className="text-muted-foreground ml-1">
                          Historia clínica interoperable para continuidad asistencial y calidad en la atención.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-foreground">Resolución 866 de 2021:</span>
                        <span className="text-muted-foreground ml-1">
                          Interoperabilidad semántica y técnica en sistemas de información en salud.
                        </span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Estándares Internacionales */}
              <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center">
                    <Globe className="mr-3 h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                    Estándares Internacionales
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-foreground">HL7 FHIR:</span>
                        <span className="text-muted-foreground ml-1">
                          Intercambio de información clínica estructurada y estandarizada globalmente.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-foreground">ISO/IEC 27701:2019:</span>
                        <span className="text-muted-foreground ml-1">
                          Sistema de gestión de privacidad de la información con controles específicos.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-foreground">Prácticas OWASP:</span>
                        <span className="text-muted-foreground ml-1">
                          Seguridad en aplicaciones web con prevención de vulnerabilidades críticas.
                        </span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Metodología y Arquitectura */}
              <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center">
                    <Layers className="mr-3 h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    Metodología y Arquitectura
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-foreground">Metodología UWE Adaptada:</span>
                        <span className="text-muted-foreground ml-1">
                          Modelado de casos de uso reales con enfoque en experiencia de usuario centrada en salud.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-foreground">Integración CITISALUD TOPRA:</span>
                        <span className="text-muted-foreground ml-1">
                          Conectividad simulada con sistemas nacionales de información en salud.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-foreground">Compatibilidad PAIWEB:</span>
                        <span className="text-muted-foreground ml-1">
                          Integración con el Programa Ampliado de Inmunizaciones del Ministerio de Salud.
                        </span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* Seguridad y Usabilidad */}
              <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground flex items-center">
                    <UserCheck className="mr-3 h-6 w-6 text-purple-600 dark:text-purple-400" />
                    Seguridad y Usabilidad
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-foreground">Seguridad por Diseño:</span>
                        <span className="text-muted-foreground ml-1">
                          Autenticación por roles, cifrado AES-256, control de acceso granular y auditoría completa.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-foreground">Privacidad por Diseño:</span>
                        <span className="text-muted-foreground ml-1">
                          Consentimiento informado, minimización de datos y pseudonimización automática.
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <span className="font-medium text-foreground">Accesibilidad WAI:</span>
                        <span className="text-muted-foreground ml-1">
                          Diseño inclusivo siguiendo WCAG 2.1 AA para garantizar acceso universal al sistema.
                        </span>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Footer CTA */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-700 dark:to-cyan-700 rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold text-white mb-4">Tecnología Confiable para la Salud Pública</h3>
                <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
                  Nuestro compromiso con la excelencia técnica y el cumplimiento normativo garantiza que SIGEV sea una
                  herramienta segura, confiable y eficiente para la gestión de esquemas de vacunación en Colombia.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-emerald-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <FileText className="mr-2 h-5 w-5" />
                    Documentación Técnica
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-emerald-600 transition-all duration-300 hover:scale-105"
                  >
                    <Shield className="mr-2 h-5 w-5" />
                    Certificaciones de Seguridad
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-700 dark:to-cyan-700 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-cyan-600/20 dark:from-emerald-700/20 dark:to-cyan-700/20" />
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)]" />

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              ¿Listo para transformar la gestión de vacunación?
            </h3>
            <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
              Únete a la revolución digital en salud pública y mejora la eficiencia de tu institución con SIGEV.
            </p>
            <Button
              size="lg"
              className="bg-white text-emerald-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 hover:scale-105 font-medium"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Solicitar Demostración
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
