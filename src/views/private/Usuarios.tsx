"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  UserPlus,
  Shield,
  Stethoscope,
  User,
  Mail,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import API_URL from "@/config/config";

interface UserData {
  id: number;
  nombre: string;
  telefono: string;
  activo: boolean;
  fecha: string;
  rol: {
    id: number;
    nombre: string;
    descripcion: string | null;
    activo: boolean;
  };
  usuario: {
    nombre_usuario: string;
    correo: string;
  };
}

interface FormData {
  nombre: string;
  telefono: string;
  usuario: {
    correo: string;
    nombre_usuario: string;
    contrasena: string;
  };
  rol_id: number;
  medico?: {
    especialidad: string;
    registro_medico: string;
  };
  paciente?: {
    tipo_documento: string;
    documento: string;
    fecha_de_nacimiento: string;
    genero: string;
    direccion: string;
  };
}

export default function GestionUsuarios() {
  const [currentUser, setCurrentUser] = useState<UserData | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    telefono: "",
    usuario: {
      correo: "",
      nombre_usuario: "",
      contrasena: "",
    },
    rol_id: 3, // Por defecto paciente
    medico: {
      especialidad: "",
      registro_medico: "",
    },
    paciente: {
      tipo_documento: "CC",
      documento: "",
      fecha_de_nacimiento: "",
      genero: "M",
      direccion: "",
    },
  });

  // Verificar autorización al cargar el componente
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user: UserData = JSON.parse(userData);
        setCurrentUser(user);

        // Verificar si es administrador
        if (user.rol.nombre === "admin" || user.rol.id === 1) {
          setIsAuthorized(true);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  const handleInputChange = (field: string, value: string | number) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...((prev[parent as keyof FormData] || {}) as object),
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const payload: Record<string, unknown> = {
        nombre: formData.nombre,
        telefono: formData.telefono,
        rol_id: formData.rol_id,
        usuario: {
          nombre_usuario: formData.usuario.nombre_usuario,
          correo: formData.usuario.correo,
          contrasena: formData.usuario.contrasena,
        },
      };
      if (formData.rol_id === 2) {
        payload.medico = formData.medico;
      }
      if (formData.rol_id === 3) {
        payload.paciente = formData.paciente;
      }

      const response = await fetch(`${API_URL}/users/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Manejo seguro del JSON
      let result: Record<string, unknown> = {};
      try {
        const text = await response.text();
        result = text ? JSON.parse(text) : {};
      } catch {
        result = {};
      }

      if (response.ok && result.code === 201) {
        setMessage({
          type: "success",
          text: "Usuario registrado exitosamente",
        });
        // Limpiar formulario
        setFormData({
          nombre: "",
          telefono: "",
          usuario: {
            correo: "",
            nombre_usuario: "",
            contrasena: "",
          },
          rol_id: 3,
          medico: {
            especialidad: "",
            registro_medico: "",
          },
          paciente: {
            tipo_documento: "CC",
            documento: "",
            fecha_de_nacimiento: "",
            genero: "M",
            direccion: "",
          },
        });
      } else {
        let errorMsg = "Error al registrar usuario";
        if (typeof result.error === "string") {
          errorMsg = result.error;
        }
        setMessage({
          type: "error",
          text: errorMsg,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage({
        type: "error",
        text: "Error de conexión. Intente nuevamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Si no está autorizado, mostrar mensaje de acceso denegado
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
        <div className="container mx-auto max-w-2xl">
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
              <CardTitle className="text-2xl text-red-700 dark:text-red-300">
                Acceso Restringido
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                Esta sección está disponible únicamente para usuarios
                administradores.
              </p>
              <p className="text-sm text-muted-foreground">
                {currentUser ? (
                  <>
                    Su rol actual es:{" "}
                    <Badge variant="outline">{currentUser.rol.nombre}</Badge>
                  </>
                ) : (
                  "No se encontró información de usuario válida."
                )}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Gestión de Usuarios
              </h1>
              <p className="text-muted-foreground">
                Registrar nuevos usuarios en el sistema SIGEV
              </p>
            </div>
            <Badge className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
              <Shield className="w-4 h-4 mr-2" />
              Solo Administradores
            </Badge>
          </div>
        </div>

        {/* Información del usuario actual */}
        <Card className="mb-6 border-emerald-200 dark:border-emerald-800">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900 rounded-lg">
                <Shield className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  Sesión activa: {currentUser?.nombre}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentUser?.usuario.correo} • Rol: {currentUser?.rol.nombre}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Formulario de registro */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <UserPlus className="mr-3 h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              Registrar Nuevo Usuario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Información básica */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre Completo *</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) =>
                      handleInputChange("nombre", e.target.value)
                    }
                    placeholder="Ingrese el nombre completo"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono *</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) =>
                      handleInputChange("telefono", e.target.value)
                    }
                    placeholder="Ingrese el teléfono"
                    required
                  />
                </div>
              </div>

              {/* Información de usuario */}
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Mail className="mr-2 h-4 w-4" />
                  Información de Acceso
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="correo">Correo Electrónico *</Label>
                    <Input
                      id="correo"
                      type="email"
                      value={formData.usuario.correo}
                      onChange={(e) =>
                        handleInputChange("usuario.correo", e.target.value)
                      }
                      placeholder="correo@ejemplo.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nombre_usuario">Nombre de Usuario *</Label>
                    <Input
                      id="nombre_usuario"
                      value={formData.usuario.nombre_usuario}
                      onChange={(e) =>
                        handleInputChange(
                          "usuario.nombre_usuario",
                          e.target.value
                        )
                      }
                      placeholder="nombre_usuario"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contrasena">Contraseña *</Label>
                  <div className="relative">
                    <Input
                      id="contrasena"
                      type={showPassword ? "text" : "password"}
                      value={formData.usuario.contrasena}
                      onChange={(e) =>
                        handleInputChange("usuario.contrasena", e.target.value)
                      }
                      placeholder="Ingrese la contraseña"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Selección de rol */}
              <Separator />
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  Rol del Usuario
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="rol">Rol *</Label>
                  <Select
                    value={formData.rol_id.toString()}
                    onValueChange={(value) =>
                      handleInputChange("rol_id", Number.parseInt(value))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">
                        <div className="flex items-center">
                          <Shield className="mr-2 h-4 w-4" />
                          Administrador
                        </div>
                      </SelectItem>
                      <SelectItem value="2">
                        <div className="flex items-center">
                          <Stethoscope className="mr-2 h-4 w-4" />
                          Médico
                        </div>
                      </SelectItem>
                      <SelectItem value="3">
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          Paciente
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Campos específicos para médico */}
              {formData.rol_id === 2 && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <Stethoscope className="mr-2 h-4 w-4" />
                      Información Médica
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="especialidad">Especialidad *</Label>
                        <Input
                          id="especialidad"
                          value={formData.medico?.especialidad || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "medico.especialidad",
                              e.target.value
                            )
                          }
                          placeholder="Ej: Medicina General"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="registro_medico">
                          Registro Médico *
                        </Label>
                        <Input
                          id="registro_medico"
                          value={formData.medico?.registro_medico || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "medico.registro_medico",
                              e.target.value
                            )
                          }
                          placeholder="Ej: RM-12345"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Campos específicos para paciente */}
              {formData.rol_id === 3 && (
                <>
                  <Separator />
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Información del Paciente
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tipo_documento">
                          Tipo de Documento *
                        </Label>
                        <Select
                          value={formData.paciente?.tipo_documento || "CC"}
                          onValueChange={(value) =>
                            handleInputChange("paciente.tipo_documento", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="CC">
                              Cédula de Ciudadanía
                            </SelectItem>
                            <SelectItem value="TI">
                              Tarjeta de Identidad
                            </SelectItem>
                            <SelectItem value="CE">
                              Cédula de Extranjería
                            </SelectItem>
                            <SelectItem value="PA">Pasaporte</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="documento">Número de Documento *</Label>
                        <Input
                          id="documento"
                          value={formData.paciente?.documento || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "paciente.documento",
                              e.target.value
                            )
                          }
                          placeholder="Ingrese el documento"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="fecha_nacimiento">
                          Fecha de Nacimiento *
                        </Label>
                        <Input
                          id="fecha_nacimiento"
                          type="date"
                          value={formData.paciente?.fecha_de_nacimiento || ""}
                          onChange={(e) =>
                            handleInputChange(
                              "paciente.fecha_de_nacimiento",
                              e.target.value
                            )
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="genero">Género *</Label>
                        <Select
                          value={formData.paciente?.genero || "M"}
                          onValueChange={(value) =>
                            handleInputChange("paciente.genero", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="M">Masculino</SelectItem>
                            <SelectItem value="F">Femenino</SelectItem>
                            <SelectItem value="O">Otro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="direccion">Dirección *</Label>
                      <Input
                        id="direccion"
                        value={formData.paciente?.direccion || ""}
                        onChange={(e) =>
                          handleInputChange(
                            "paciente.direccion",
                            e.target.value
                          )
                        }
                        placeholder="Ingrese la dirección completa"
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Mensaje de estado */}
              {message && (
                <Alert
                  className={
                    message.type === "success"
                      ? "border-green-200 bg-green-50 dark:bg-green-950"
                      : "border-red-200 bg-red-50 dark:bg-red-950"
                  }
                >
                  {message.type === "success" ? (
                    <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  )}
                  <AlertDescription
                    className={
                      message.type === "success"
                        ? "text-green-700 dark:text-green-300"
                        : "text-red-700 dark:text-red-300"
                    }
                  >
                    {message.text}
                  </AlertDescription>
                </Alert>
              )}

              {/* Botón de envío */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setFormData({
                      nombre: "",
                      telefono: "",
                      usuario: {
                        correo: "",
                        nombre_usuario: "",
                        contrasena: "",
                      },
                      rol_id: 3,
                      medico: {
                        especialidad: "",
                        registro_medico: "",
                      },
                      paciente: {
                        tipo_documento: "CC",
                        documento: "",
                        fecha_de_nacimiento: "",
                        genero: "M",
                        direccion: "",
                      },
                    });
                    setMessage(null);
                  }}
                >
                  Limpiar Formulario
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registrando...
                    </>
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Registrar Usuario
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Información adicional */}
        <Card className="mt-6 border-blue-200 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Información importante:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Los campos marcados con (*) son obligatorios</li>
                  <li>El nombre de usuario debe ser único en el sistema</li>
                  <li>La contraseña debe tener al menos 8 caracteres</li>
                  <li>
                    Los usuarios registrados recibirán sus credenciales por
                    correo
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
