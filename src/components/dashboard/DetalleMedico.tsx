"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Phone,
  Calendar,
  Save,
  X,
  Loader2,
  Stethoscope,
  UserCheck,
} from "lucide-react";
import {
  useMedicos,
  type Medico,
  type MedicoDetalle,
} from "@/hooks/useMedicos";
import { useToast } from "@/hooks/useToast";

interface DetalleMedicoProps {
  medico: Medico;
  mode: "view" | "edit";
  onUpdate: () => void;
  onModeChange: (mode: "view" | "edit") => void;
}

export function DetalleMedico({
  medico,
  mode,
  onUpdate,
  onModeChange,
}: DetalleMedicoProps) {
  const { getMedicoDetalle, updateMedico } = useMedicos();
  const { toast } = useToast();

  const [medicoDetalle, setMedicoDetalle] = useState<MedicoDetalle | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<MedicoDetalle>>({});
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    console.log("Consultando detalle de médico", medico.id);
    const fetchDetalle = async () => {
      setLoading(true);
      setLocalError(null);
      const detalle = await getMedicoDetalle(medico.id);
      if (detalle) {
        setMedicoDetalle(detalle);
        setFormData(detalle);
        setLocalError(null);
      } else {
        setMedicoDetalle(null);
        setLocalError("No se pudo cargar el detalle del médico.");
      }
      setLoading(false);
    };

    fetchDetalle();
  }, [medico.id, getMedicoDetalle]);

  const handleInputChange = (field: keyof MedicoDetalle, value: string) => {
    setFormData((prev: Partial<MedicoDetalle>) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const success = await updateMedico(formData);
      if (success) {
        toast({
          title: "Médico actualizado",
          description:
            "Los datos del médico han sido actualizados correctamente.",
        });
        onUpdate();
        onModeChange("view");
      } else {
        toast({
          title: "Error",
          description: "No se pudo actualizar el médico. Inténtalo de nuevo.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "Ocurrió un error inesperado. Inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData(medicoDetalle || {});
    onModeChange("view");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-emerald-600" />
          <p className="text-muted-foreground">
            Cargando detalle del médico...
          </p>
        </div>
      </div>
    );
  }

  if (localError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{localError}</p>
        <Button
          onClick={async () => {
            setLocalError(null);
            setLoading(true);
            const detalle = await getMedicoDetalle(medico.id);
            if (detalle) {
              setMedicoDetalle(detalle);
              setFormData(detalle);
              setLocalError(null);
            } else {
              setLocalError("No se pudo cargar el detalle del médico.");
            }
            setLoading(false);
          }}
          className="mt-4"
        >
          Reintentar
        </Button>
      </div>
    );
  }

  if (!medicoDetalle) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">
          No se pudo cargar la información del médico.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Información Personal */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <User className="mr-2 h-5 w-5 text-emerald-600" />
            Información Personal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="nombres">Nombres</Label>
              {mode === "edit" ? (
                <Input
                  id="nombres"
                  value={formData.nombres || ""}
                  onChange={(e) => handleInputChange("nombres", e.target.value)}
                />
              ) : (
                <p className="text-sm font-medium mt-1">
                  {medicoDetalle.nombres}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="apellidos">Apellidos</Label>
              {mode === "edit" ? (
                <Input
                  id="apellidos"
                  value={formData.apellidos || ""}
                  onChange={(e) =>
                    handleInputChange("apellidos", e.target.value)
                  }
                />
              ) : (
                <p className="text-sm font-medium mt-1">
                  {medicoDetalle.apellidos}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="documento">Documento</Label>
              {mode === "edit" ? (
                <Input
                  id="documento"
                  value={formData.documento || ""}
                  onChange={(e) =>
                    handleInputChange("documento", e.target.value)
                  }
                />
              ) : (
                <p className="text-sm font-medium mt-1">
                  {medicoDetalle.documento}
                </p>
              )}
            </div>
            <div>
              <Label>Género</Label>
              <p className="text-sm font-medium mt-1">
                {medicoDetalle.genero === "M"
                  ? "Masculino"
                  : medicoDetalle.genero === "F"
                  ? "Femenino"
                  : "No especificado"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información Profesional */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Stethoscope className="mr-2 h-5 w-5 text-emerald-600" />
            Información Profesional
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="especialidad">Especialidad</Label>
              {mode === "edit" ? (
                <Input
                  id="especialidad"
                  value={formData.especialidad || ""}
                  onChange={(e) =>
                    handleInputChange("especialidad", e.target.value)
                  }
                />
              ) : (
                <div className="mt-1">
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                  >
                    {medicoDetalle.especialidad}
                  </Badge>
                </div>
              )}
            </div>
            <div>
              <Label htmlFor="registro_medico">Registro Médico</Label>
              {mode === "edit" ? (
                <Input
                  id="registro_medico"
                  value={formData.registro_medico || ""}
                  onChange={(e) =>
                    handleInputChange("registro_medico", e.target.value)
                  }
                />
              ) : (
                <p className="text-sm font-medium font-mono mt-1">
                  {medicoDetalle.registro_medico}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Información de Contacto */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Phone className="mr-2 h-5 w-5 text-emerald-600" />
            Información de Contacto
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="telefono">Teléfono</Label>
              {mode === "edit" ? (
                <Input
                  id="telefono"
                  value={formData.telefono || ""}
                  onChange={(e) =>
                    handleInputChange("telefono", e.target.value)
                  }
                />
              ) : (
                <p className="text-sm font-medium mt-1">
                  {medicoDetalle.telefono}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="correo">Correo Electrónico</Label>
              {mode === "edit" ? (
                <Input
                  id="correo"
                  type="email"
                  value={formData.correo || ""}
                  onChange={(e) => handleInputChange("correo", e.target.value)}
                />
              ) : (
                <p className="text-sm font-medium mt-1">
                  {medicoDetalle.correo}
                </p>
              )}
            </div>
            {medicoDetalle.direccion && (
              <div className="md:col-span-2">
                <Label htmlFor="direccion">Dirección</Label>
                {mode === "edit" ? (
                  <Input
                    id="direccion"
                    value={formData.direccion || ""}
                    onChange={(e) =>
                      handleInputChange("direccion", e.target.value)
                    }
                  />
                ) : (
                  <p className="text-sm font-medium mt-1">
                    {medicoDetalle.direccion}
                  </p>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Información del Sistema */}
      {medicoDetalle.usuario && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <UserCheck className="mr-2 h-5 w-5 text-emerald-600" />
              Información del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Usuario del Sistema</Label>
                <p className="text-sm font-medium mt-1">
                  {medicoDetalle.usuario.nombre_usuario}
                </p>
              </div>
              <div>
                <Label>Estado del Usuario</Label>
                <div className="mt-1">
                  <Badge
                    className={
                      medicoDetalle.usuario.is_active
                        ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                        : "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                    }
                  >
                    {medicoDetalle.usuario.is_active ? "Activo" : "Inactivo"}
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Fechas del Sistema */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Calendar className="mr-2 h-5 w-5 text-emerald-600" />
            Información de Registro
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medicoDetalle.fecha_creacion && (
              <div>
                <Label>Fecha de Registro</Label>
                <p className="text-sm font-medium mt-1">
                  {new Date(medicoDetalle.fecha_creacion).toLocaleDateString(
                    "es-CO",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>
            )}
            {medicoDetalle.fecha_actualizacion && (
              <div>
                <Label>Última Actualización</Label>
                <p className="text-sm font-medium mt-1">
                  {new Date(
                    medicoDetalle.fecha_actualizacion
                  ).toLocaleDateString("es-CO", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Botones de Acción */}
      {mode === "edit" && (
        <div className="flex justify-end space-x-3 pt-4 border-t">
          <Button variant="outline" onClick={handleCancel} disabled={saving}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {saving ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      )}
    </div>
  );
}
