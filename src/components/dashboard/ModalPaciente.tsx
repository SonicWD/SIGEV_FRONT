"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Save, X } from "lucide-react"
import { usePacientes, type Paciente } from "@/hooks/usePacientes"

interface ModalPacienteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  paciente?: Paciente | null
  mode: "create" | "edit"
  onSuccess: () => void
}

export function ModalPaciente({ open, onOpenChange, paciente, mode, onSuccess }: ModalPacienteProps) {
  const { createPaciente, updatePaciente, loading } = usePacientes()
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    tipo_documento: "CC",
    documento: "",
    nombres: "",
    apellidos: "",
    fecha_de_nacimiento: "",
    genero: "M" as "M" | "F",
    direccion: "",
    telefono: "",
    correo: "",
    activo: true,
  })

  useEffect(() => {
    if (mode === "edit" && paciente) {
      setFormData({
        tipo_documento: paciente.tipo_documento,
        documento: paciente.documento,
        nombres: paciente.nombres,
        apellidos: paciente.apellidos,
        fecha_de_nacimiento: paciente.fecha_de_nacimiento,
        genero: paciente.genero,
        direccion: paciente.direccion,
        telefono: paciente.telefono,
        correo: paciente.correo,
        activo: paciente.activo,
      })
    } else {
      setFormData({
        tipo_documento: "CC",
        documento: "",
        nombres: "",
        apellidos: "",
        fecha_de_nacimiento: "",
        genero: "M",
        direccion: "",
        telefono: "",
        correo: "",
        activo: true,
      })
    }
    setError(null)
  }, [mode, paciente, open])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setError(null)
  }

  const validateForm = () => {
    if (!formData.nombres.trim()) return "El nombre es requerido"
    if (!formData.apellidos.trim()) return "Los apellidos son requeridos"
    if (!formData.documento.trim()) return "El documento es requerido"
    if (!formData.fecha_de_nacimiento) return "La fecha de nacimiento es requerida"
    if (!formData.telefono.trim()) return "El teléfono es requerido"
    if (!formData.correo.trim()) return "El correo es requerido"
    if (!formData.direccion.trim()) return "La dirección es requerida"

    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.correo)) return "El formato del correo no es válido"

    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    try {
      if (mode === "create") {
        await createPaciente(formData)
      } else if (mode === "edit" && paciente) {
        await updatePaciente({ ...formData, id: paciente.id })
      }
      onSuccess()
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err && err.response && typeof err.response === "object" && "data" in err.response && err.response.data && typeof err.response.data === "object" && "message" in err.response.data) {
        setError((err.response as { data: { message?: string } }).data.message || "Error al guardar el paciente")
      } else {
        setError("Error al guardar el paciente")
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center text-xl">
            {mode === "create" ? "Agregar Nuevo Paciente" : "Editar Paciente"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" ? "Complete la información del nuevo paciente" : "Modifique la información del paciente"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
              <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
              <AlertDescription className="text-red-700 dark:text-red-300">{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Tipo de Documento */}
            <div className="space-y-2">
              <Label htmlFor="tipo_documento">Tipo de Documento</Label>
              <Select
                value={formData.tipo_documento}
                onValueChange={(value) => handleInputChange("tipo_documento", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CC">Cédula de Ciudadanía</SelectItem>
                  <SelectItem value="TI">Tarjeta de Identidad</SelectItem>
                  <SelectItem value="CE">Cédula de Extranjería</SelectItem>
                  <SelectItem value="PA">Pasaporte</SelectItem>
                  <SelectItem value="RC">Registro Civil</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Documento */}
            <div className="space-y-2">
              <Label htmlFor="documento">Número de Documento</Label>
              <Input
                id="documento"
                value={formData.documento}
                onChange={(e) => handleInputChange("documento", e.target.value)}
                placeholder="Ingrese el número de documento"
                className="bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nombres */}
            <div className="space-y-2">
              <Label htmlFor="nombres">Nombres</Label>
              <Input
                id="nombres"
                value={formData.nombres}
                onChange={(e) => handleInputChange("nombres", e.target.value)}
                placeholder="Ingrese los nombres"
                className="bg-background"
              />
            </div>

            {/* Apellidos */}
            <div className="space-y-2">
              <Label htmlFor="apellidos">Apellidos</Label>
              <Input
                id="apellidos"
                value={formData.apellidos}
                onChange={(e) => handleInputChange("apellidos", e.target.value)}
                placeholder="Ingrese los apellidos"
                className="bg-background"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Fecha de Nacimiento */}
            <div className="space-y-2">
              <Label htmlFor="fecha_de_nacimiento">Fecha de Nacimiento</Label>
              <Input
                id="fecha_de_nacimiento"
                type="date"
                value={formData.fecha_de_nacimiento}
                onChange={(e) => handleInputChange("fecha_de_nacimiento", e.target.value)}
                className="bg-background"
              />
            </div>

            {/* Género */}
            <div className="space-y-2">
              <Label htmlFor="genero">Género</Label>
              <Select value={formData.genero} onValueChange={(value) => handleInputChange("genero", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="M">Masculino</SelectItem>
                  <SelectItem value="F">Femenino</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Teléfono */}
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                value={formData.telefono}
                onChange={(e) => handleInputChange("telefono", e.target.value)}
                placeholder="Ingrese el teléfono"
                className="bg-background"
              />
            </div>

            {/* Correo */}
            <div className="space-y-2">
              <Label htmlFor="correo">Correo Electrónico</Label>
              <Input
                id="correo"
                type="email"
                value={formData.correo}
                onChange={(e) => handleInputChange("correo", e.target.value)}
                placeholder="Ingrese el correo electrónico"
                className="bg-background"
              />
            </div>
          </div>

          {/* Dirección */}
          <div className="space-y-2">
            <Label htmlFor="direccion">Dirección</Label>
            <Textarea
              id="direccion"
              value={formData.direccion}
              onChange={(e) => handleInputChange("direccion", e.target.value)}
              placeholder="Ingrese la dirección completa"
              className="bg-background"
              rows={3}
            />
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? "Guardando..." : mode === "create" ? "Crear Paciente" : "Actualizar Paciente"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
