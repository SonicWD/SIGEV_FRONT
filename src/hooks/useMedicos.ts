"use client";

import { useState, useEffect, useCallback } from "react";
import api from "@/lib/api";

export interface Medico {
  id: number;
  nombres: string;
  apellidos: string;
  documento: string;
  especialidad: string;
  registro_medico: string;
  telefono: string;
  correo: string;
  activo: boolean;
  fecha_creacion?: string;
  fecha_actualizacion?: string;
}

export interface MedicoDetalle extends Medico {
  // Campos adicionales que puedan venir en el detalle
  direccion?: string;
  fecha_nacimiento?: string;
  genero?: string;
  usuario?: {
    id: number;
    nombre_usuario: string;
    correo: string;
    is_active: boolean;
  };
}

interface UseMedicosReturn {
  medicos: Medico[];
  loading: boolean;
  error: string | null;
  totalMedicos: number;
  fetchMedicos: () => Promise<void>;
  deleteMedico: (id: number) => Promise<boolean>;
  updateMedico: (medico: Partial<MedicoDetalle>) => Promise<boolean>;
  getMedicoDetalle: (id: number) => Promise<MedicoDetalle | null>;
}

export const useMedicos = (): UseMedicosReturn => {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalMedicos, setTotalMedicos] = useState(0);

  const fetchMedicos = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/medicos/listar/");

      if (response.data.code === 200) {
        const medicosData = response.data.data || [];
        setMedicos(medicosData);
        setTotalMedicos(medicosData.length);
      } else {
        throw new Error(response.data.error || "Error al cargar médicos");
      }
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const errorObj = err as { response?: { data?: { message?: string } } };
        setError(
          errorObj.response?.data?.message || "Error al cargar los médicos"
        );
      } else {
        setError("Error al cargar los médicos");
      }
      console.error("Error fetching medicos:", err);
      setMedicos([]);
      setTotalMedicos(0);
    } finally {
      setLoading(false);
    }
  };

  const deleteMedico = async (id: number): Promise<boolean> => {
    try {
      const response = await api.delete(`/medicos/admin/${id}/eliminar/`);

      if (response.data.code === 200) {
        // Actualizar la lista local
        setMedicos((prev) => prev.filter((medico) => medico.id !== id));
        setTotalMedicos((prev) => prev - 1);
        return true;
      } else {
        throw new Error(response.data.error || "Error al eliminar médico");
      }
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const errorObj = err as { response?: { data?: { message?: string } } };
        setError(
          errorObj.response?.data?.message || "Error al eliminar el médico"
        );
      } else {
        setError("Error al eliminar el médico");
      }
      console.error("Error deleting medico:", err);
      return false;
    }
  };

  const updateMedico = async (
    medicoData: Partial<MedicoDetalle>
  ): Promise<boolean> => {
    try {
      const response = await api.put("/medicos/actualizar-perfil/", medicoData);

      if (response.data.code === 200) {
        // Actualizar la lista local
        setMedicos((prev) =>
          prev.map((medico) =>
            medico.id === medicoData.id ? { ...medico, ...medicoData } : medico
          )
        );
        return true;
      } else {
        throw new Error(response.data.error || "Error al actualizar médico");
      }
    } catch (err: unknown) {
      if (typeof err === "object" && err !== null && "response" in err) {
        const errorObj = err as { response?: { data?: { message?: string } } };
        setError(
          errorObj.response?.data?.message || "Error al actualizar el médico"
        );
      } else {
        setError("Error al actualizar el médico");
      }
      console.error("Error updating medico:", err);
      return false;
    }
  };

  const getMedicoDetalle = useCallback(
    async (id: number): Promise<MedicoDetalle | null> => {
      try {
        const response = await api.get(`/medicos/admin/${id}/`);
        if (response.data.code === 200 && response.data.data) {
          return response.data.data;
        } else if (response.status === 200 && response.data.id) {
          // Respuesta directa del médico
          return response.data;
        } else {
          throw new Error(
            response.data.error || "Error al cargar detalle del médico"
          );
        }
      } catch (err: unknown) {
        if (typeof err === "object" && err !== null && "response" in err) {
          const errorObj = err as {
            response?: { data?: { message?: string } };
          };
          setError(
            errorObj.response?.data?.message ||
              "Error al obtener el detalle del médico"
          );
        } else {
          setError("Error al obtener el detalle del médico");
        }
        console.error("Error fetching medico detalle:", err);
        return null;
      }
    },
    []
  );

  useEffect(() => {
    fetchMedicos();
  }, []);

  return {
    medicos,
    loading,
    error,
    totalMedicos,
    fetchMedicos,
    deleteMedico,
    updateMedico,
    getMedicoDetalle,
  };
};
