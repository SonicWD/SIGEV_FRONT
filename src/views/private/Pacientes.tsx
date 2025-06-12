"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Users,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Filter,
  Download,
  RefreshCw,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { usePacientes } from "@/hooks/usePacientes";
import type { Paciente } from "@/hooks/usePacientes";
import { ModalPaciente } from "@/components/dashboard/ModalPaciente";
import { DetallePaciente } from "@/components/dashboard/DetallePaciente";

interface Usuario {
  rol: {
    id: number;
    nombre: string;
  };
}

export default function Pacientes() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [pacienteToDelete, setPacienteToDelete] = useState<Paciente | null>(
    null
  );
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");

  const {
    pacientes,
    loading,
    error,
    fetchPacientes,
    deletePaciente,
    refreshPacientes,
  } = usePacientes();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const usuarioData = localStorage.getItem("user");

    if (!accessToken || !usuarioData) {
      navigate("/iniciar-sesion");
      return;
    }

    try {
      const parsedUsuario = JSON.parse(usuarioData);
      if (parsedUsuario.rol.id !== 1 && parsedUsuario.rol.id !== 3) {
        navigate("/dashboard");
        return;
      }
      setUsuario(parsedUsuario);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/iniciar-sesion");
    }
  }, [navigate]);

  useEffect(() => {
    if (usuario) {
      fetchPacientes();
    }
  }, [usuario, fetchPacientes]);

  const filteredPacientes = Array.isArray(pacientes)
    ? pacientes.filter(
        (paciente) =>
          paciente.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paciente.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
          paciente.documento.includes(searchTerm) ||
          paciente.correo.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleEditPaciente = (paciente: Paciente) => {
    setSelectedPaciente(paciente);
    setModalMode("edit");
    setShowModal(true);
  };

  const handleViewPaciente = (paciente: Paciente) => {
    setSelectedPaciente(paciente);
    setShowDetail(true);
  };

  const handleDeleteClick = (paciente: Paciente) => {
    setPacienteToDelete(paciente);
    setShowDeleteDialog(true);
  };

  const handleConfirmDelete = async () => {
    if (pacienteToDelete) {
      await deletePaciente(pacienteToDelete.id);
      setShowDeleteDialog(false);
      setPacienteToDelete(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-CO");
  };

  const getGenderBadge = (genero: string) => {
    return genero === "M" ? (
      <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
        Masculino
      </Badge>
    ) : (
      <Badge className="bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300">
        Femenino
      </Badge>
    );
  };

  if (!usuario) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificando permisos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <div className="bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-3 rounded-xl shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Gestión de Pacientes
                </h1>
                <p className="text-muted-foreground">
                  Administra la información de los pacientes registrados
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={refreshPacientes}
                disabled={loading}
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950"
              >
                <RefreshCw
                  className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                />
                Actualizar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-700 dark:text-red-300">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Filters and Search */}
        <Card className="mb-6 border-0 bg-card/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-foreground flex items-center">
              <Search className="mr-2 h-5 w-5 text-emerald-600" />
              Buscar y Filtrar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar por nombre, apellido, documento o correo..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-background border-border"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filtros
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="border-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Total Pacientes</p>
                  <p className="text-3xl font-bold">{pacientes.length}</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Pacientes Activos</p>
                  <p className="text-3xl font-bold">
                    {pacientes.filter((p) => p.activo).length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Resultados</p>
                  <p className="text-3xl font-bold">
                    {filteredPacientes.length}
                  </p>
                </div>
                <Search className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Patients Table */}
        <Card className="border-0 bg-card/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">
              Lista de Pacientes
            </CardTitle>
            <CardDescription>
              {filteredPacientes.length} paciente
              {filteredPacientes.length !== 1 ? "s" : ""} encontrado
              {filteredPacientes.length !== 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Cargando pacientes...</p>
                </div>
              </div>
            ) : filteredPacientes.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No hay pacientes
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm
                    ? "No se encontraron pacientes con los criterios de búsqueda."
                    : "Aún no hay pacientes registrados en el sistema."}
                </p>
                {!searchTerm && <></>}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombres</TableHead>
                      <TableHead>Apellidos</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Documento
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Fecha Nac.
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Género
                      </TableHead>
                      <TableHead className="hidden xl:table-cell">
                        Teléfono
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Correo
                      </TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Estado
                      </TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPacientes.map((paciente, index) => (
                      <TableRow
                        key={paciente.id}
                        className="hover:bg-muted/50 transition-colors animate-fadeIn"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <TableCell className="font-medium">
                          {paciente.nombres}
                        </TableCell>
                        <TableCell>{paciente.apellidos}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">
                              {paciente.tipo_documento}
                            </span>
                            <span>{paciente.documento}</span>
                          </div>
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {formatDate(paciente.fecha_de_nacimiento)}
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {getGenderBadge(paciente.genero)}
                        </TableCell>
                        <TableCell className="hidden xl:table-cell">
                          {paciente.telefono}
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          <span className="text-sm">{paciente.correo}</span>
                        </TableCell>
                        <TableCell className="hidden sm:table-cell">
                          {paciente.activo ? (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                              Activo
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-300">
                              Inactivo
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleViewPaciente(paciente)}
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Ver Detalle
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleEditPaciente(paciente)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              {usuario?.rol.id === 1 && (
                                <DropdownMenuItem
                                  onClick={() => handleDeleteClick(paciente)}
                                  className="text-red-600 dark:text-red-400"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Eliminar
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Modal Paciente */}
      <ModalPaciente
        open={showModal}
        onOpenChange={setShowModal}
        paciente={selectedPaciente}
        mode={modalMode}
        onSuccess={() => {
          setShowModal(false);
          refreshPacientes();
        }}
      />

      {/* Detalle Paciente */}
      <DetallePaciente
        open={showDetail}
        onOpenChange={setShowDetail}
        paciente={selectedPaciente}
        onEdit={(paciente) => {
          setShowDetail(false);
          handleEditPaciente(paciente);
        }}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminará permanentemente el
              paciente{" "}
              <strong>
                {pacienteToDelete?.nombres} {pacienteToDelete?.apellidos}
              </strong>{" "}
              del sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
