import { Routes, Route } from 'react-router-dom'

// Importamos vistas públicas desde la carpeta src/views/public
import Inicio from '@/views/public/Inicio'
import Nosotros from '@/views/public/Nosotros'
import Ayuda from '@/views/public/Ayuda'
import Contacto from '@/views/public/Contacto'
import Normatividad from '@/views/public/Normatividad'
import IniciarSesion from '@/views/public/iniciar-sesion'


export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/ayuda" element={<Ayuda />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/normatividad" element={<Normatividad />} />
      <Route path="/iniciar-sesion" element={<IniciarSesion />} />
      <Route path="*" element={<h1 className="text-center mt-20 text-2xl">404 - Página no encontrada</h1>} />
    </Routes>
  )
}
