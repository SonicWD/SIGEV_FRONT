import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, ExternalLink, Scale, BookOpen, AlertCircle, Shield } from "lucide-react"

export default function Normativa() {
  const regulations = [
    {
      title: "Resolución 3280 de 2018",
      entity: "Ministerio de Salud y Protección Social",
      description:
        "Lineamientos técnicos y operativos de la Ruta Integral de Atención para la Promoción y Mantenimiento de la Salud",
      type: "Nacional",
      date: "2018",
      pdf: "https://www.minsalud.gov.co/Normatividad_Nuevo/Resolución%203280%20de%202018.pdf",
      web: "https://www.minsalud.gov.co/Normatividad_Nuevo/Resolución-3280-de-2018.aspx",
    },
    {
      title: "Circular 007 de 2023",
      entity: "Ministerio de Salud",
      description:
        "Orientaciones para el fortalecimiento de la vacunación en el territorio nacional",
      type: "Nacional",
      date: "2023",
      pdf: "https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/DIJ/circular-externa-007-de-2023.pdf",
      web: "https://www.minsalud.gov.co/Normatividad/Paginas/circular-externa-007-de-2023.aspx",
    },
    {
      title: "Decreto 780 de 2016",
      entity: "Presidencia de la República",
      description:
        "Decreto Único Reglamentario del Sector Salud y Protección Social",
      type: "Nacional",
      date: "2016",
      pdf: "https://dapre.presidencia.gov.co/normativa/normativa/DECRETO%20780%20DEL%2006%20DE%20MAYO%20DE%202016.pdf",
      web: "https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=74222",
    },
    {
      title: "Resolución 518 de 2015",
      entity: "Ministerio de Salud",
      description:
        "Directriz de Dosificación, Programación y Aplicación de Vacunas",
      type: "Nacional",
      date: "2015",
      pdf: "https://www.minsalud.gov.co/Normatividad_Nuevo/Resolución%20518%20de%202015.pdf",
      web: "https://www.minsalud.gov.co/Normatividad_Nuevo/Resolución-518-de-2015.aspx",
    },
  ];

  const guidelines = [
    {
      icon: BookOpen,
      title: "Protocolos de Vacunación",
      description:
        "Procedimientos estandarizados para la aplicación segura de vacunas",
    },
    {
      icon: Scale,
      title: "Marco Legal",
      description:
        "Cumplimiento de normativas nacionales e internacionales de salud",
    },
    {
      icon: AlertCircle,
      title: "Eventos Adversos",
      description:
        "Protocolos para el manejo y reporte de eventos adversos post-vacunación",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <Badge className="mb-6 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-colors border-emerald-200 dark:border-emerald-800">
              <Scale className="w-4 h-4 mr-2" />
              Marco regulatorio
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Normativa
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              SIGEV cumple con todas las regulaciones y lineamientos
              establecidos por las autoridades sanitarias colombianas para
              garantizar la seguridad y eficacia en la gestión de esquemas de
              vacunación.
            </p>
          </div>
        </section>

        {/* Guidelines */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Lineamientos Principales
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Principios fundamentales que rigen nuestro sistema
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {guidelines.map((guideline, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm hover:-translate-y-2"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-950 dark:to-cyan-950 rounded-xl group-hover:from-emerald-200 group-hover:to-cyan-200 dark:group-hover:from-emerald-900 dark:group-hover:to-cyan-900 transition-all duration-300 group-hover:scale-110">
                      <guideline.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <CardTitle className="text-xl text-foreground">
                      {guideline.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-muted-foreground leading-relaxed">
                      {guideline.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Regulations */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Normativas Aplicables
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Documentos oficiales que respaldan nuestras operaciones
              </p>
            </div>
            <div className="space-y-6">
              {regulations.map((regulation, index) => (
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
                            className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                          >
                            <FileText className="w-3 h-3 mr-1" />
                            {regulation.type}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {regulation.date}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {regulation.title}
                        </h3>
                        <p className="text-muted-foreground mb-2">
                          {regulation.description}
                        </p>
                        <p className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                          {regulation.entity}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                          asChild
                        >
                          <a
                            href={regulation.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Download className="w-4 h-4 mr-1" />
                            PDF
                          </a>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 dark:hover:bg-cyan-950"
                          asChild
                        >
                          <a
                            href={regulation.web}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Ver
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance */}
        <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-700 dark:to-cyan-700">
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <Shield className="h-12 w-12 text-white mr-4" />
                <h3 className="text-3xl md:text-4xl font-bold text-white">
                  Cumplimiento Garantizado
                </h3>
              </div>
              <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
                SIGEV está diseñado para cumplir automáticamente con todas las
                normativas vigentes, asegurando que tu institución mantenga los
                más altos estándares de calidad y legalidad.
              </p>
              <Button
                size="lg"
                className="bg-white text-emerald-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 hover:scale-105"
              >
                <FileText className="mr-2 h-5 w-5" />
                Descargar Documentación Completa
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
