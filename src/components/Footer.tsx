import { Shield, Heart, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white py-12 px-4 border-t border-slate-800">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 p-2 rounded-xl shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">SIGEV</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-sm mx-auto md:mx-0">
              Sistema de Información para la Gestión de Esquemas de Vacunación
            </p>
            <div className="flex items-center justify-center md:justify-start text-emerald-400">
              <Heart className="h-4 w-4 mr-2" />
              <span className="text-sm">Comprometidos con la salud pública digital</span>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-start text-gray-400">
                <MapPin className="h-4 w-4 mr-2 text-emerald-400" />
                <span className="text-sm">Calle 5 # 4-56, Guatavita, Cundinamarca</span>
              </div>
              <div className="flex items-center justify-center md:justify-start text-gray-400">
                <Phone className="h-4 w-4 mr-2 text-emerald-400" />
                <span className="text-sm">(601) 123-4567</span>
              </div>
              <div className="flex items-center justify-center md:justify-start text-gray-400">
                <Mail className="h-4 w-4 mr-2 text-emerald-400" />
                <span className="text-sm">info@sigev.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold mb-4 text-emerald-400">Enlaces Rápidos</h3>
            <div className="space-y-2">
              <a href="/nosotros" className="block text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                Nosotros
              </a>
              <a href="/normativa" className="block text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                Normativa
              </a>
              <a href="/ayuda" className="block text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                Ayuda
              </a>
              <a href="/contacto" className="block text-gray-400 hover:text-emerald-400 transition-colors text-sm">
                Contacto
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            Hospital San Antonio de Guatavita • {new Date().getFullYear()} • Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  )
}
