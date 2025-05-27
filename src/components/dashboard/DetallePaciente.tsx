"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, Calendar, FileText, Edit, UserCheck, BadgeIcon as IdCard } from "lucide-react"
import type { Paciente } from "@/hooks/usePacientes"

interface DetallePacienteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  paciente: Paciente | null
  onEdit: (paciente: Paciente) => void
}

export function DetallePaciente({ open, onOpenChange, paciente, onEdit }: DetallePacienteProps) {
  if (!paciente) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const calculateAge = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }

    return age
  }

  const getGenderText = (genero: string) => {
    return genero === "M" ? "Masculino" : "Femenino"
  }

  const getDocumentTypeText = (tipo: string) => {
    const types: { [key: string]: string } = {
      CC: "Cédula de Ciudadanía",
      TI: "Tarjeta de Identidad",
      CE: "Cédula de Extranjería",
      PA: "Pasaporte",
      RC: "Registro Civil",
    }
    return types[tipo] || tipo
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-2xl">
            <User className="mr-3 h-6 w-6 text-purple-600" />
            Detalle del Paciente
          </DialogTitle>
          <DialogDescription>
            Información completa de {paciente.nombres} {paciente.apellidos}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header con información básica */}
          <Card className="border-0 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {paciente.nombres} {paciente.apellidos}
                    </h3>
                    <p className="text-muted-foreground">
                      {getDocumentTypeText(paciente.tipo_documento)}: {paciente.documento}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        className={
                          paciente.activo
                            ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-300"
                        }
                      >
                        {paciente.activo ? "Activo" : "Inactivo"}
                      </Badge>
                      <Badge
                        className={
                          paciente.genero === "M"
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                            : "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300"
                        }
                      >
                        {getGenderText(paciente.genero)}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => onEdit(paciente)}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar Información
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Información personal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <IdCard className="mr-2 h-5 w-5 text-emerald-600" />
                  Información Personal
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Fecha de Nacimiento</p>
                    <p className="font-medium">{formatDate(paciente.fecha_de_nacimiento)}</p>
                    <p className="text-sm text-muted-foreground">{calculateAge(paciente.fecha_de_nacimiento)} años</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center space-x-3">
                  <UserCheck className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Género</p>
                    <p className="font-medium">{getGenderText(paciente.genero)}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Documento</p>
                    <p className="font-medium">{getDocumentTypeText(paciente.tipo_documento)}</p>
                    <p className="text-sm text-muted-foreground">{paciente.documento}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Phone className="mr-2 h-5 w-5 text-cyan-600" />
                  Información de Contacto
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <p className="font-medium">{paciente.telefono}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Correo Electrónico</p>
                    <p className="font-medium">{paciente.correo}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-sm text-muted-foreground">Dirección</p>
                    <p className="font-medium">{paciente.direccion}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Información adicional */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <FileText className="mr-2 h-5 w-5 text-blue-600" />
                Información del Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">ID del Paciente</p>
                  <p className="text-2xl font-bold text-foreground">#{paciente.id}</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Estado</p>
                  <p className="text-2xl font-bold text-foreground">{paciente.activo ? "Activo" : "Inactivo"}</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Edad</p>
                  <p className="text-2xl font-bold text-foreground">
                    {calculateAge(paciente.fecha_de_nacimiento)} años
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
