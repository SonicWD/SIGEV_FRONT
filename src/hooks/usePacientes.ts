"use client"

import { useState, useCallback } from "react"
import api  from "@/lib/api"

export interface Paciente {
  id: number
  tipo_documento: string
  documento: string
  nombres: string
  apellidos: string
  fecha_de_nacimiento: string
  genero: "M" | "F"
  direccion: string
  telefono: string
  correo: string
  activo: boolean
}

export const usePacientes = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPacientes = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.get("/pacientes/")
      setPacientes(response.data)
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al cargar los pacientes")
      console.error("Error fetching pacientes:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchPaciente = useCallback(async (id: number) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.get(`/pacientes/${id}/`)
      return response.data
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al cargar el paciente")
      console.error("Error fetching paciente:", err)
      return null
    } finally {
      setLoading(false)
    }
  }, [])

  const createPaciente = useCallback(async (pacienteData: Omit<Paciente, "id">) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.post("/pacientes/", pacienteData)
      setPacientes((prev) => [...prev, response.data])
      return response.data
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al crear el paciente")
      console.error("Error creating paciente:", err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const updatePaciente = useCallback(async (pacienteData: Paciente) => {
    setLoading(true)
    setError(null)

    try {
      const response = await api.put("/pacientes/admin/actualizar/", pacienteData)
      setPacientes((prev) => prev.map((p) => (p.id === pacienteData.id ? response.data : p)))
      return response.data
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al actualizar el paciente")
      console.error("Error updating paciente:", err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const deletePaciente = useCallback(async (id: number) => {
    setLoading(true)
    setError(null)

    try {
      await api.delete(`/pacientes/admin/${id}/eliminar/`)
      setPacientes((prev) => prev.filter((p) => p.id !== id))
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al eliminar el paciente")
      console.error("Error deleting paciente:", err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const refreshPacientes = useCallback(() => {
    fetchPacientes()
  }, [fetchPacientes])

  return {
    pacientes,
    loading,
    error,
    fetchPacientes,
    fetchPaciente,
    createPaciente,
    updatePaciente,
    deletePaciente,
    refreshPacientes,
  }
}
