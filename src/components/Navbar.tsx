"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Shield, Menu } from "lucide-react"
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

  return (
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

          {/* Mobile Navigation */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-muted transition-colors">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background border-border">
                <div className="flex flex-col space-y-4 mt-8">
                  {navItems.map((item) => (
                    <Button
                      key={item.key}
                      variant={isCurrentPage(item.href) ? "default" : "ghost"}
                      className={
                        isCurrentPage(item.href)
                          ? "bg-gradient-to-r from-emerald-600 to-cyan-600 text-white justify-start shadow-md"
                          : "text-muted-foreground hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950 justify-start transition-all duration-300"
                      }
                      asChild
                      onClick={() => setIsOpen(false)}
                    >
                      <Link to={item.href}>{item.name}</Link>
                    </Button>
                  ))}
                  <Button
                    className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white justify-start mt-4 shadow-lg"
                    asChild
                    onClick={() => setIsOpen(false)}
                  >
                    <Link to="/iniciar-sesion">Iniciar Sesión</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
