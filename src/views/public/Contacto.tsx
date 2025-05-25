import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import contactData from "@/data/contact.json"
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from "lucide-react"

const iconMap = { MapPin, Phone, Mail, Clock, MessageSquare, Send }

const contactInfo = contactData.map((item) => ({
  ...item,
  icon: iconMap[item.icon as keyof typeof iconMap],
}))


export default function Contacto() {

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Hero Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto text-center">
            <Badge className="mb-6 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900 transition-colors border-emerald-200 dark:border-emerald-800">
              <MessageSquare className="w-4 h-4 mr-2" />
              Estamos aquí para ayudarte
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-cyan-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
              Contacto
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              ¿Tienes preguntas sobre SIGEV? ¿Necesitas soporte técnico? ¿Quieres conocer más sobre nuestros servicios?
              Contáctanos y te responderemos a la brevedad.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-emerald-600 dark:text-emerald-400 flex items-center">
                    <Send className="mr-3 h-6 w-6" />
                    Envíanos un Mensaje
                  </CardTitle>
                  <CardDescription>Completa el formulario y nos pondremos en contacto contigo</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Nombre</label>
                      <Input placeholder="Tu nombre completo" className="bg-background border-border" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                      <Input type="email" placeholder="tu@email.com" className="bg-background border-border" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Institución</label>
                    <Input placeholder="Nombre de tu institución" className="bg-background border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Asunto</label>
                    <Input placeholder="¿En qué podemos ayudarte?" className="bg-background border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Mensaje</label>
                    <Textarea
                      placeholder="Describe tu consulta o solicitud..."
                      rows={5}
                      className="bg-background border-border"
                    />
                  </div>
                  <Button className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white hover:scale-105 transition-transform">
                    <Send className="mr-2 h-4 w-4" />
                    Enviar Mensaje
                  </Button>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card
                    key={index}
                    className="border-0 bg-card/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-950 dark:to-cyan-950 rounded-xl">
                          <info.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">{info.title}</h3>
                          {info.details.map((detail, detailIndex) => (
                            <p key={detailIndex} className="text-muted-foreground mb-1">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Nuestra Ubicación</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Visítanos en el Hospital San Antonio de Guatavita
              </p>
            </div>
            <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-lg overflow-hidden">
              <div className="h-96 bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-950 dark:to-cyan-950 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-emerald-600 dark:text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-2">Mapa Interactivo</h3>
                  <p className="text-muted-foreground">Hospital San Antonio de Guatavita</p>
                  <p className="text-muted-foreground">Calle 5 # 4-56, Guatavita, Cundinamarca</p>
                  <Button className="mt-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white hover:scale-105 transition-transform">
                    Ver en Google Maps
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-emerald-600 to-cyan-600 dark:from-emerald-700 dark:to-cyan-700">
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white">¿Listo para implementar SIGEV?</h3>
              <p className="text-xl text-emerald-100 mb-8 leading-relaxed">
                Contáctanos hoy mismo para una demostración personalizada y descubre cómo SIGEV puede transformar la
                gestión de vacunación en tu institución.
              </p>
              <Button
                size="lg"
                className="bg-white text-emerald-600 hover:bg-gray-50 shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 hover:scale-105"
              >
                <Phone className="mr-2 h-5 w-5" />
                Solicitar Demostración
              </Button>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  )
}
