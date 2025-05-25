import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Heart, Award, Target, Shield, Stethoscope } from "lucide-react"

export default function Nosotros() {
  const team = [
    {
      name: "Dr. María González",
      role: "Directora Médica",
      description: "Especialista en Salud Pública con 15 años de experiencia",
    },
    {
      name: "Ing. Carlos Rodríguez",
      role: "Director de Tecnología",
      description: "Experto en sistemas de información hospitalaria",
    },
    {
      name: "Enf. Ana Martínez",
      role: "Coordinadora de Vacunación",
      description: "Líder en programas de inmunización comunitaria",
    },
  ]

  const values = [
    {
      icon: Heart,
      title: "Compromiso",
      description: "Dedicados a mejorar la salud pública a través de la tecnología",
    },
    {
      icon: Shield,
      title: "Seguridad",
      description: "Protección de datos y privacidad de pacientes como prioridad",
    },
    {
      icon: Award,
      title: "Excelencia",
      description: "Estándares de calidad en cada proceso y funcionalidad",
    },
    {
      icon: Target,
      title: "Innovación",
      description: "Soluciones tecnológicas avanzadas para desafíos de salud",
    },
  ]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <Badge className="mb-6 bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:hover:bg-emerald-900 transition-colors border-emerald-200 dark:border-emerald-800">
              <Users className="w-4 h-4 mr-2" />
              Conoce nuestro equipo
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Nosotros
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Somos un equipo multidisciplinario comprometido con la transformación digital de la salud pública,
              trabajando para hacer más eficiente y segura la gestión de esquemas de vacunación.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <CardTitle className="text-2xl text-emerald-600 dark:text-emerald-400 flex items-center group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                    <Target className="mr-3 h-6 w-6" />
                    Nuestra Misión
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Desarrollar y mantener un sistema de información robusto y confiable que facilite la gestión
                    integral de esquemas de vacunación, contribuyendo a la mejora de la salud pública y el bienestar de
                    la comunidad del Hospital San Antonio de Guatavita.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group">
                <CardHeader>
                  <CardTitle className="text-2xl text-cyan-600 dark:text-cyan-400 flex items-center group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                    <Stethoscope className="mr-3 h-6 w-6" />
                    Nuestra Visión
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Ser reconocidos como líderes en la implementación de soluciones tecnológicas para la salud pública,
                    estableciendo un estándar de excelencia en la gestión digital de programas de inmunización a nivel
                    regional y nacional.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Nuestros Valores</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Los principios que guían nuestro trabajo y compromiso con la salud pública
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm hover:-translate-y-2 hover:scale-105"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-950 dark:to-cyan-950 rounded-xl group-hover:from-emerald-200 group-hover:to-cyan-200 dark:group-hover:from-emerald-900 dark:group-hover:to-cyan-900 transition-all duration-300 group-hover:scale-110">
                      <value.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors" />
                    </div>
                    <CardTitle className="text-xl text-foreground group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                      {value.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-muted-foreground leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Nuestro Equipo</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Profesionales dedicados que hacen posible SIGEV
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm hover:-translate-y-2 overflow-hidden"
                >
                  <CardHeader className="text-center relative">
                    {/* Background decoration */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-950/50 dark:to-cyan-950/50 opacity-50 group-hover:opacity-70 transition-opacity" />

                    <div className="relative z-10">
                      <div className="mx-auto mb-4 w-24 h-24 bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-900 dark:to-cyan-900 rounded-full flex items-center justify-center group-hover:from-emerald-200 group-hover:to-cyan-200 dark:group-hover:from-emerald-800 dark:group-hover:to-cyan-800 transition-all duration-300 group-hover:scale-110 shadow-lg">
                        <Users className="h-12 w-12 text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors" />
                      </div>
                      <CardTitle className="text-xl text-foreground mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                        {member.name}
                      </CardTitle>
                      <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 group-hover:bg-emerald-200 dark:group-hover:bg-emerald-800 transition-colors">
                        {member.role}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-center text-muted-foreground leading-relaxed">
                      {member.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-700 dark:to-cyan-700">
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                ¿Quieres formar parte de nuestro equipo?
              </h3>
              <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
                Únete a nosotros en la misión de transformar la gestión de vacunación y contribuir a la salud pública
                digital.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-emerald-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 rounded-lg font-medium">
                  Ver Oportunidades
                </button>
                <button className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 transition-all duration-300 px-8 py-3 rounded-lg font-medium">
                  Contactar RRHH
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
