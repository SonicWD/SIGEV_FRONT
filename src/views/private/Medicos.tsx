"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Search,
  Eye,
  Trash2,
  Edit,
  Stethoscope,
  UserCheck,
  UserX,
  RefreshCw,
  Filter,
} from "lucide-react";
import { useMedicos, type Medico } from "@/hooks/useMedicos";
import { ModalMedico } from "@/components/dashboard/ModalMedico";
import { useToast } from "@/hooks/useToast";

export default function GestionMedicos() {
  const { medicos, loading, error, totalMedicos, fetchMedicos, deleteMedico } =
    useMedicos();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedico, setSelectedMedico] = useState<Medico | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"view" | "edit">("view");
  const [filterActivo, setFilterActivo] = useState<
    "all" | "active" | "inactive"
  >("all");

  // Filtrar médicos
  const filteredMedicos = medicos.filter((medico) => {
    const matchesSearch =
      medico.nombres.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medico.apellidos.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medico.documento.includes(searchTerm) ||
      medico.especialidad.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medico.registro_medico.includes(searchTerm) ||
      medico.correo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      filterActivo === "all" ||
      (filterActivo === "active" && medico.activo) ||
      (filterActivo === "inactive" && !medico.activo);

    return matchesSearch && matchesFilter;
  });

  const handleViewMedico = (medico: Medico) => {
    setSelectedMedico(medico);
    setModalMode("view");
    setModalOpen(true);
  };

  const handleEditMedico = (medico: Medico) => {
    setSelectedMedico(medico);
    setModalMode("edit");
    setModalOpen(true);
  };

  const handleDeleteMedico = async (medico: Medico) => {
    const success = await deleteMedico(medico.id);
    if (success) {
      toast({
        title: "Médico eliminado",
        description: `${medico.nombres} ${medico.apellidos} ha sido inactivado correctamente.`,
      });
    } else {
      toast({
        title: "Error",
        description: "No se pudo eliminar el médico. Inténtalo de nuevo.",
        variant: "destructive",
      });
    }
  };

  const handleRefresh = () => {
    fetchMedicos();
    toast({
      title: "Lista actualizada",
      description: "La lista de médicos ha sido actualizada.",
    });
  };

  const getStatusBadge = (activo: boolean) => {
    return activo ? (
      <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
        <UserCheck className="w-3 h-3 mr-1" />
        Activo
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
        <UserX className="w-3 h-3 mr-1" />
        Inactivo
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
        <div className="container mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
              <p className="text-muted-foreground">Cargando médicos...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-6">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 p-3 rounded-xl shadow-md">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                Gestión de Médicos
              </h1>
              <p className="text-muted-foreground">
                Administra el personal médico del sistema SIGEV
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100">Total Médicos</p>
                  <p className="text-3xl font-bold">{totalMedicos}</p>
                </div>
                <Stethoscope className="h-8 w-8 text-emerald-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Médicos Activos</p>
                  <p className="text-3xl font-bold">
                    {medicos.filter((m) => m.activo).length}
                  </p>
                </div>
                <UserCheck className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-cyan-100">Especialidades</p>
                  <p className="text-3xl font-bold">
                    {new Set(medicos.map((m) => m.especialidad)).size}
                  </p>
                </div>
                <Filter className="h-8 w-8 text-cyan-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6 border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-foreground flex items-center">
              <Search className="mr-3 h-5 w-5 text-emerald-600" />
              Buscar y Filtrar Médicos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Buscar por nombre, documento, especialidad, registro médico o correo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterActivo === "all" ? "default" : "outline"}
                  onClick={() => setFilterActivo("all")}
                  size="sm"
                >
                  Todos
                </Button>
                <Button
                  variant={filterActivo === "active" ? "default" : "outline"}
                  onClick={() => setFilterActivo("active")}
                  size="sm"
                >
                  Activos
                </Button>
                <Button
                  variant={filterActivo === "inactive" ? "default" : "outline"}
                  onClick={() => setFilterActivo("inactive")}
                  size="sm"
                >
                  Inactivos
                </Button>
                <Button variant="outline" onClick={handleRefresh} size="sm">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Error Message */}
        {error && (
          <Card className="mb-6 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950">
            <CardContent className="p-4">
              <p className="text-red-700 dark:text-red-300">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Médicos Table */}
        <Card className="border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">
              Lista de Médicos ({filteredMedicos.length})
            </CardTitle>
            <CardDescription>
              Gestiona la información del personal médico registrado en el
              sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredMedicos.length === 0 ? (
              <div className="text-center py-8">
                <Stethoscope className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {searchTerm || filterActivo !== "all"
                    ? "No se encontraron médicos con los filtros aplicados."
                    : "No hay médicos registrados en el sistema."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nombre Completo</TableHead>
                      <TableHead>Documento</TableHead>
                      <TableHead>Especialidad</TableHead>
                      <TableHead>Registro Médico</TableHead>
                      <TableHead>Contacto</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMedicos.map((medico) => (
                      <TableRow key={medico.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium">
                          {medico.nombres} {medico.apellidos}
                        </TableCell>
                        <TableCell>{medico.documento}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                          >
                            {medico.especialidad}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {medico.registro_medico}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{medico.telefono}</div>
                            <div className="text-muted-foreground">
                              {medico.correo}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(medico.activo)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewMedico(medico)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditMedico(medico)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            {medico.activo && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      ¿Estás seguro?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Esta acción inactivará al médico{" "}
                                      {medico.nombres} {medico.apellidos}. El
                                      médico no podrá acceder al sistema pero
                                      sus registros se mantendrán.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancelar
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteMedico(medico)}
                                      className="bg-red-600 hover:bg-red-700"
                                    >
                                      Inactivar Médico
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Modal */}
        <ModalMedico
          medico={selectedMedico}
          isOpen={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedMedico(null);
          }}
          mode={modalMode}
          onUpdate={() => {
            fetchMedicos();
            setModalOpen(false);
            setSelectedMedico(null);
          }}
        />
      </div>
    </div>
  );
}
