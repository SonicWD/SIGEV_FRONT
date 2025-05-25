import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, Search, Book, Video, MessageCircle, Phone, Mail, Download} from "lucide-react";
import faqsData from "@/data/faqs.json";
import resourcesData from "@/data/resources.json";

const iconMap = { Book, Video, Download };

const resources = resourcesData.map((item) => ({
  ...item,
  icon: iconMap[item.icon as keyof typeof iconMap],
}));

const faqs = faqsData;

export default function Ayuda() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <Badge className="mb-6 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-colors border-emerald-200 dark:border-emerald-800">
              <HelpCircle className="w-4 h-4 mr-2" />
              Centro de ayuda
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Ayuda
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Encuentra respuestas a tus preguntas, accede a recursos de
              capacitación y obtén el soporte que necesitas para aprovechar al
              máximo SIGEV.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Buscar en la ayuda..."
                className="pl-10 py-3 text-lg border-border focus:border-emerald-500 bg-background"
              />
            </div>
          </div>
        </section>

        {/* Quick Support */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Soporte Rápido
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Múltiples canales para obtener ayuda inmediata
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-950 dark:to-cyan-950 rounded-xl group-hover:from-emerald-200 group-hover:to-cyan-200 dark:group-hover:from-emerald-900 dark:group-hover:to-cyan-900 transition-all duration-300 group-hover:scale-110">
                    <MessageCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    Chat en Vivo
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                    Chatea con nuestro equipo de soporte técnico en tiempo real
                  </CardDescription>
                  <Button className="bg-gradient-to-r from-emerald-600 to-cyan-600 text-white hover:scale-105 transition-transform">
                    Iniciar Chat
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-950 dark:to-cyan-950 rounded-xl group-hover:from-emerald-200 group-hover:to-cyan-200 dark:group-hover:from-emerald-900 dark:group-hover:to-cyan-900 transition-all duration-300 group-hover:scale-110">
                    <Phone className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    Soporte Telefónico
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                    Llámanos para recibir asistencia personalizada
                  </CardDescription>
                  <Button
                    variant="outline"
                    className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                  >
                    (601) 123-4567
                  </Button>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm hover:-translate-y-2">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-950 dark:to-cyan-950 rounded-xl group-hover:from-emerald-200 group-hover:to-cyan-200 dark:group-hover:from-emerald-900 dark:group-hover:to-cyan-900 transition-all duration-300 group-hover:scale-110">
                    <Mail className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <CardTitle className="text-xl text-foreground">
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                    Envíanos un correo con tu consulta detallada
                  </CardDescription>
                  <Button
                    variant="outline"
                    className="border-cyan-300 text-cyan-700 hover:bg-cyan-50 dark:hover:bg-cyan-950"
                  >
                    soporte@sigev.com
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Preguntas Frecuentes
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Respuestas a las consultas más comunes sobre SIGEV
              </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-6">
              {faqs.map((faq, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-lg transition-all duration-300 border-l-4 border-l-emerald-500 bg-card/80 backdrop-blur-sm hover:-translate-y-1"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge
                            variant="secondary"
                            className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                          >
                            {faq.category}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-3">
                          {faq.question}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Recursos de Capacitación
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Materiales para aprender y dominar todas las funcionalidades
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {resources.map((resource, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-0 bg-card/80 backdrop-blur-sm hover:-translate-y-2"
                >
                  <CardHeader className="text-center pb-4">
                    <div className="mx-auto mb-4 p-4 bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-950 dark:to-cyan-950 rounded-xl group-hover:from-emerald-200 group-hover:to-cyan-200 dark:group-hover:from-emerald-900 dark:group-hover:to-cyan-900 transition-all duration-300 group-hover:scale-110">
                      <resource.icon className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <CardTitle className="text-xl text-foreground">
                      {resource.title}
                    </CardTitle>
                    <div className="flex justify-center mt-2">
                      <Badge className="bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300">
                        {resource.type}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-muted-foreground leading-relaxed mb-4">
                      {resource.description}
                    </CardDescription>
                    <Button
                      variant="outline"
                      className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Descargar
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
