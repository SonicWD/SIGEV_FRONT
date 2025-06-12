"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Stethoscope, Edit } from "lucide-react";
import type { Medico } from "@/hooks/useMedicos";
import { DetalleMedico } from "./DetalleMedico";

interface ModalMedicoProps {
  medico: Medico | null;
  isOpen: boolean;
  onClose: () => void;
  mode: "view" | "edit";
  onUpdate: () => void;
}

export function ModalMedico({
  medico,
  isOpen,
  onClose,
  mode,
  onUpdate,
}: ModalMedicoProps) {
  const [currentMode, setCurrentMode] = useState<"view" | "edit">(mode);

  useEffect(() => {
    setCurrentMode(mode);
  }, [mode]);

  if (!medico) return null;

  const handleModeChange = (newMode: "view" | "edit") => {
    setCurrentMode(newMode);
  };

  const getStatusBadge = (activo: boolean) => {
    return activo ? (
      <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
        Activo
      </Badge>
    ) : (
      <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
        Inactivo
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <div>
                <DialogTitle className="text-xl">
                  {currentMode === "view"
                    ? "Detalle del Médico"
                    : "Editar Médico"}
                </DialogTitle>
                <DialogDescription>
                  {medico.nombres} {medico.apellidos}
                </DialogDescription>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {getStatusBadge(medico.activo)}
              {currentMode === "view" && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleModeChange("edit")}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <Separator className="my-4" />

        <DetalleMedico
          medico={medico}
          mode={currentMode}
          onUpdate={onUpdate}
          onModeChange={handleModeChange}
        />
      </DialogContent>
    </Dialog>
  );
}
