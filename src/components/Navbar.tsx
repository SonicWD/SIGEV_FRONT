"use client"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Shield, Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/ThemeToggle"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { name: "Inicio", href: "/", key: "/" },
    { name: "Nosotros", href: "/nosotros", key: "/nosotros" },
    { name: "Normatividad", href: "/normatividad", key: "/normatividad" },
    { name: "Ayuda", href: "/ayuda", key: "/ayuda" },
    { name: "Contacto", href: "/contacto", key: "/contacto" },
  ]

  const isCurrentPage = (path: string) => location.pathname === path

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <>
      <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-gradient-to-br from-emerald-500 to-cyan-600 p-2 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-md">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
                  SIGEV
                </h1>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  Sistema de Información para la Gestión de Esquemas de Vacunación
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Button
                  key={item.key}
                  variant={isCurrentPage(item.href) ? "default" : "ghost"}
                  className={
                    isCurrentPage(item.href)
                      ? "bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-md"
                      : "text-muted-foreground hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 transition-all duration-300"
                  }
                  asChild
                >
                  <Link to={item.href}>{item.name}</Link>
                </Button>
              ))}
              <ThemeToggle />
              <Button className="ml-4 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <Link to="/iniciar-sesion">Iniciar Sesión</Link>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="relative hover:bg-muted transition-colors"
                aria-label="Abrir menú de navegación"
              >
                <div className="relative w-6 h-6">
                  <Menu
                    className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                      isOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                    }`}
                  />
                  <X
                    className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                      isOpen ? "rotate-0 opacity-100" : "-rotate-180 opacity-0"
                    }`}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-all duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-background border-l border-border z-50 lg:hidden transform transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Menu Content */}
        <div className="flex flex-col h-full pt-8">
          {/* Navigation Links */}
          <nav className="flex-1 px-6">
            <div className="space-y-2">
              {navItems.map((item, index) => (
                <Link
                  key={item.key}
                  to={item.href}
                  className={`group flex items-center px-4 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    isCurrentPage(item.href)
                      ? "bg-gradient-to-r from-emerald-600 to-cyan-600 text-white shadow-lg"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isOpen ? "slideInRight 0.3s ease-out forwards" : "none",
                  }}
                >
                  <span className="font-medium">{item.name}</span>
                  <div
                    className={`ml-auto w-2 h-2 rounded-full transition-all duration-300 ${
                      isCurrentPage(item.href) ? "bg-white" : "bg-emerald-500 opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              ))}
            </div>

            {/* Login Button - Moved up and better positioned */}
            <div className="mt-8 pt-6 border-t border-border">
              <Link
                to="/iniciar-sesion"
                className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-medium"
              >
                Iniciar Sesión
              </Link>
            </div>
          </nav>

          {/* Menu Footer - Simplified */}
          <div className="p-6 border-t border-border">
            <div className="text-center">
              <p className="text-xs text-muted-foreground">Hospital San Antonio de Guatavita</p>
              <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} SIGEV</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
